import { DEFAULT_FALLBACK_MESSAGE } from "./data/error-map";
import type { HumanizedResult, HumanizerConfig, SwapContext } from "./types";
import { extractRawMessage } from "./utils/extraction";
import { matchLocalErrorDetailed } from "./utils/matching";

export * from "./index";

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
  private openaiApiKey: string | null = null;
  private openaiInstance: unknown = null;
  private model: string;
  private fallbackMessage: string;

  constructor(config: HumanizerConfig = {}) {
    if (config.openaiApiKey) {
      this.openaiApiKey = config.openaiApiKey;
    }
    this.model = config.aiModel || "gpt-4o-mini";
    this.fallbackMessage = config.fallbackMessage || DEFAULT_FALLBACK_MESSAGE;
  }

  /**
   * Check if AI fallback is enabled.
   */
  get hasAI(): boolean {
    return this.openaiApiKey !== null;
  }

  private async getOpenAI(): Promise<unknown> {
    if (this.openaiInstance) return this.openaiInstance;
    if (!this.openaiApiKey) return null;

    try {
      const { OpenAI } = await import("openai");
      this.openaiInstance = new OpenAI({ apiKey: this.openaiApiKey });
      return this.openaiInstance;
    } catch {
      return null;
    }
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

      if (this.openaiApiKey) {
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
    } catch {
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
    const openai = (await this.getOpenAI()) as {
      chat: {
        completions: {
          create: (opts: Record<string, unknown>) => Promise<{
            choices: Array<{ message: { content: string | null } }>;
          }>;
        };
      };
    } | null;

    if (!openai) {
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
        const response = await openai.chat.completions.create({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
          max_tokens: 100,
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
          const delay = 2 ** attempt * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (isLastAttempt) {
          return this.fallbackMessage;
        }
      }
    }

    return this.fallbackMessage;
  }
}
