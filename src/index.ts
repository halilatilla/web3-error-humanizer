import { OpenAI } from "openai";
import { DEFAULT_FALLBACK_MESSAGE, LOCAL_ERROR_MAP } from "./data/error-map";
import type { HumanizedResult, HumanizerConfig, SwapContext } from "./types";
import { extractRawMessage } from "./utils/extraction";
import { matchLocalErrorDetailed } from "./utils/matching";

export { LOCAL_ERROR_MAP } from "./data/error-map";
export * from "./types";

/**
 * Humanize error using ONLY the local dictionary (no API key needed).
 * Returns null if no match found.
 *
 * @example
 * const message = humanizeErrorLocal(error);
 * if (message) {
 *   showError(message);
 * } else {
 *   showError("Transaction failed");
 * }
 */
export function humanizeErrorLocal(error: unknown): string | null {
  try {
    const rawMessage = extractRawMessage(error);
    const match = matchLocalErrorDetailed(rawMessage);
    return match ? match.message : null;
  } catch (err) {
    // If extraction/matching fails, return null
    if (process.env.NODE_ENV === "development") {
      console.warn("Error humanization failed:", err);
    }
    return null;
  }
}

/**
 * Humanize error using local dictionary with a fallback message.
 * No API key needed - completely free and instant.
 *
 * @example
 * const message = humanizeError(error);
 * showError(message); // Always returns a string
 */
export function humanizeError(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE
): string {
  try {
    return humanizeErrorLocal(error) ?? fallback;
  } catch (err) {
    // If extraction fails, return fallback
    if (process.env.NODE_ENV === "development") {
      console.warn("Error humanization failed:", err);
    }
    return fallback;
  }
}

/**
 * Humanize an error and return metadata about the result.
 * Does NOT call AI (local only); falls back to provided message when no match.
 */
export function humanizeErrorDetailed(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE
): HumanizedResult {
  try {
    const rawMessage = extractRawMessage(error);
    const match = matchLocalErrorDetailed(rawMessage);

    if (match) {
      return {
        message: match.message,
        source: "local",
        matchedKey: match.matchedKey,
        rawMessage,
      };
    }

    return {
      message: fallback,
      source: "fallback",
      rawMessage,
    };
  } catch (err) {
    // If extraction/matching fails, return fallback result
    if (process.env.NODE_ENV === "development") {
      console.warn("Error humanization failed:", err);
    }
    return {
      message: fallback,
      source: "fallback",
      rawMessage: "Error extraction failed",
    };
  }
}

/**
 * Web3ErrorHumanizer class with optional AI fallback.
 *
 * @example
 * // Local-only mode (no API key needed)
 * const humanizer = new Web3ErrorHumanizer();
 * const message = await humanizer.humanize(error);
 *
 * @example
 * // With AI fallback
 * const humanizer = new Web3ErrorHumanizer({
 *   openaiApiKey: process.env.OPENAI_API_KEY
 * });
 * const message = await humanizer.humanize(error);
 */
export class Web3ErrorHumanizer {
  private openai: OpenAI | null = null;
  private model: string;
  private fallbackMessage: string;

  constructor(config: HumanizerConfig = {}) {
    // Only initialize OpenAI if API key is provided
    if (config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: config.openaiApiKey,
        dangerouslyAllowBrowser: true,
      });
    }
    this.model = config.aiModel || "gpt-4o-mini";
    this.fallbackMessage = config.fallbackMessage || DEFAULT_FALLBACK_MESSAGE;
  }

  /**
   * Check if AI fallback is enabled
   */
  get hasAI(): boolean {
    return this.openai !== null;
  }

  /**
   * Humanize an error with metadata.
   * Local dictionary first, then AI (if configured), else fallback.
   */
  async humanizeDetailed(
    error: unknown,
    context?: SwapContext
  ): Promise<HumanizedResult> {
    try {
      const rawMessage = extractRawMessage(error);

      const localMatch = matchLocalErrorDetailed(rawMessage);
      if (localMatch) {
        return {
          message: localMatch.message,
          matchedKey: localMatch.matchedKey,
          source: "local",
          rawMessage,
        };
      }

      if (this.openai) {
        const message = await this.askAI(rawMessage, context);
        return {
          message,
          source: "ai",
          rawMessage,
        };
      }

      return {
        message: this.fallbackMessage,
        source: "fallback",
        rawMessage,
      };
    } catch (err) {
      // If extraction/matching fails, return fallback result
      if (process.env.NODE_ENV === "development") {
        console.warn("Error humanization failed:", err);
      }
      return {
        message: this.fallbackMessage,
        source: "fallback",
        rawMessage: "Error extraction failed",
      };
    }
  }

  /**
   * Main method to humanize an error.
   * First checks local dictionary (free & instant).
   * Falls back to AI if available, otherwise returns fallback message.
   */
  async humanize(error: unknown, context?: SwapContext): Promise<string> {
    const result = await this.humanizeDetailed(error, context);
    return result.message;
  }

  private async askAI(
    rawError: string,
    context?: SwapContext,
    retries = 2
  ): Promise<string> {
    if (!this.openai) {
      return this.fallbackMessage;
    }

    const prompt = `You are a Web3 UX expert. A user's DEX swap failed with a technical error.
Convert it into a friendly, helpful 1-sentence explanation.

TECHNICAL ERROR: "${rawError}"
CONTEXT: ${context ? JSON.stringify(context) : "No context provided"}

RULES:
- Do NOT use technical jargon like "reverted", "gas limit", "0x...", or "nonce".
- Explain WHY it happened (e.g. low liquidity, price volatility, lack of funds).
- Tell the user exactly what to do next.
- Keep it under 20 words.

Humanized Message:`;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.openai.chat.completions.create({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
          max_tokens: 100, // Limit response length
        });

        const content = response.choices[0]?.message?.content?.trim();
        if (content) {
          return content;
        }

        return this.fallbackMessage;
      } catch (error) {
        const isLastAttempt = attempt === retries;
        const isRateLimit =
          error instanceof Error &&
          (error.message.includes("rate limit") ||
            error.message.includes("429"));

        if (isRateLimit && !isLastAttempt) {
          // Exponential backoff for rate limits
          const delay = 2 ** attempt * 1000; // 1s, 2s, 4s
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        // For other errors or last attempt, return fallback
        if (isLastAttempt) {
          // Only log in development to avoid console noise in production
          if (process.env.NODE_ENV === "development") {
            console.warn("AI humanization failed:", error);
          }
          return this.fallbackMessage;
        }
      }
    }

    return this.fallbackMessage;
  }
}

/**
 * Get the count of locally supported error patterns
 */
export function getLocalErrorCount(): number {
  return Object.keys(LOCAL_ERROR_MAP).length;
}
