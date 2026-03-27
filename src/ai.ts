import { CATEGORY_META } from "./data/category-meta";
import { DEFAULT_FALLBACK_MESSAGE } from "./data/error-map";
import type { HumanizedResult, HumanizerConfig, SwapContext } from "./types";
import { extractRawMessage } from "./utils/extraction";
import { matchLocalErrorDetailed } from "./utils/matching";

export * from "./index";

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

  async humanizeDetailed(
    error: unknown,
    context?: SwapContext
  ): Promise<HumanizedResult> {
    try {
      const rawMessage = extractRawMessage(error);
      const localMatch = matchLocalErrorDetailed(rawMessage);

      if (localMatch) {
        const meta = CATEGORY_META[localMatch.category];
        return {
          message: localMatch.message,
          matchedKey: localMatch.matchedKey,
          source: "local",
          category: localMatch.category,
          severity: meta.severity,
          suggestion: meta.suggestion,
          recoverable: meta.recoverable,
          rawMessage,
        };
      }

      if (this.openaiApiKey) {
        const message = await this.askAI(rawMessage, context);
        const meta = CATEGORY_META.unknown;
        return {
          message,
          source: "ai",
          category: "unknown",
          severity: meta.severity,
          suggestion: meta.suggestion,
          recoverable: meta.recoverable,
          rawMessage,
        };
      }

      const meta = CATEGORY_META.unknown;
      return {
        message: this.fallbackMessage,
        source: "fallback",
        category: "unknown",
        severity: meta.severity,
        suggestion: meta.suggestion,
        recoverable: meta.recoverable,
        rawMessage,
      };
    } catch {
      const meta = CATEGORY_META.unknown;
      return {
        message: this.fallbackMessage,
        source: "fallback",
        category: "unknown",
        severity: meta.severity,
        suggestion: meta.suggestion,
        recoverable: meta.recoverable,
        rawMessage: "Error extraction failed",
      };
    }
  }

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
