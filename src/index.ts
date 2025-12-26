import { OpenAI } from "openai";
import { DEFAULT_FALLBACK_MESSAGE, LOCAL_ERROR_MAP } from "./data/error-map";
import { HumanizedResult, HumanizerConfig, SwapContext } from "./types";
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
  const rawMessage = extractRawMessage(error);
  const match = matchLocalErrorDetailed(rawMessage);
  return match ? match.message : null;
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
  fallback: string = DEFAULT_FALLBACK_MESSAGE,
): string {
  return humanizeErrorLocal(error) ?? fallback;
}

/**
 * Humanize an error and return metadata about the result.
 * Does NOT call AI (local only); falls back to provided message when no match.
 */
export function humanizeErrorDetailed(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE,
): HumanizedResult {
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
    context?: SwapContext,
  ): Promise<HumanizedResult> {
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

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      });

      return (
        response.choices[0].message.content?.trim() || this.fallbackMessage
      );
    } catch {
      return this.fallbackMessage;
    }
  }
}

/**
 * Get the count of locally supported error patterns
 */
export function getLocalErrorCount(): number {
  return Object.keys(LOCAL_ERROR_MAP).length;
}
