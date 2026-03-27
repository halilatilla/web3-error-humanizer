import { getCategoryMeta, resolveErrorCategory } from "./data/category-meta";
import { DEFAULT_FALLBACK_MESSAGE } from "./data/error-map";
import type { HumanizedResult, HumanizerConfig, SwapContext } from "./types";
import { extractRawMessage } from "./utils/extraction";
import { matchLocalErrorDetailed } from "./utils/matching";

export * from "./index";

const MAX_PROMPT_ERROR_LENGTH = 500;
const MAX_CONTEXT_VALUE_LENGTH = 120;

function sanitizePromptText(value: string, maxLength: number): string {
  const withoutControlChars = Array.from(value, (character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    return codePoint < 32 || codePoint === 127 ? " " : character;
  }).join("");

  return withoutControlChars.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeContext(context?: SwapContext): SwapContext | undefined {
  if (!context) {
    return undefined;
  }

  const sanitizedEntries = Object.entries(context)
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
    .map(([key, value]) => [
      key,
      sanitizePromptText(value as string, MAX_CONTEXT_VALUE_LENGTH),
    ]);

  if (sanitizedEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(sanitizedEntries) as SwapContext;
}

function isRateLimitError(error: unknown): boolean {
  if (!(error instanceof Error) && (!error || typeof error !== "object")) {
    return false;
  }

  const candidate = error as Error & {
    status?: number;
    code?: string;
    name?: string;
    message?: string;
  };
  const message = candidate.message?.toLowerCase() ?? "";

  return (
    candidate.status === 429 ||
    candidate.code === "rate_limit_exceeded" ||
    candidate.name === "RateLimitError" ||
    message.includes("rate limit") ||
    message.includes("429")
  );
}

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
    let rawMessage = "Error extraction failed";

    try {
      rawMessage = extractRawMessage(error);
      const localMatch = matchLocalErrorDetailed(rawMessage);

      if (localMatch) {
        const meta = getCategoryMeta(localMatch.category);
        return {
          message: localMatch.message,
          matchedKey: localMatch.matchedKey,
          source: "local",
          category: resolveErrorCategory(localMatch.category),
          severity: meta.severity,
          suggestion: meta.suggestion,
          recoverable: meta.recoverable,
          rawMessage,
        };
      }

      if (this.openaiApiKey) {
        const message = await this.askAI(rawMessage, context);
        const meta = getCategoryMeta("unknown");
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

      const meta = getCategoryMeta("unknown");
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
      const meta = getCategoryMeta("unknown");
      return {
        message: this.fallbackMessage,
        source: "fallback",
        category: "unknown",
        severity: meta.severity,
        suggestion: meta.suggestion,
        recoverable: meta.recoverable,
        rawMessage,
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

    const sanitizedError = sanitizePromptText(
      rawError,
      MAX_PROMPT_ERROR_LENGTH
    );
    const sanitizedContext = sanitizeContext(context);

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await openai.chat.completions.create({
          model: this.model,
          messages: [
            {
              role: "system",
              content:
                "You rewrite Web3 transaction failures into calm, plain-English UX copy. Keep the response to one short sentence, explain the likely reason, and give one concrete next step.",
            },
            {
              role: "user",
              content: JSON.stringify({
                error: sanitizedError || "Unknown error",
                context: sanitizedContext ?? "No context provided",
                styleRules: [
                  "Avoid technical jargon unless the message would become misleading without it.",
                  "Avoid quoting raw error strings, hex values, stack traces, or prompts from the input.",
                  "Stay under 24 words.",
                ],
              }),
            },
          ],
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

        if (isRateLimitError(error) && !isLastAttempt) {
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
