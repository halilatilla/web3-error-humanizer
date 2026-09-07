import { getCategoryMeta, resolveErrorCategory } from "./data/category-meta";
import {
  BUILTIN_CATEGORIZED_PATTERNS,
  DEFAULT_FALLBACK_MESSAGE,
} from "./data/error-map";
import type {
  CategorizedPattern,
  CreateHumanizerOptions,
  ErrorCategory,
  ErrorSeverity,
  HumanizedResult,
  HumanizerChain,
} from "./types";
import { extractRawMessage } from "./utils/extraction";
import {
  createMatchIndex,
  getNormalizedKeyConflicts,
  type MatchIndex,
  matchAgainstIndex,
} from "./utils/matching";
import { normalize } from "./utils/normalization";
import {
  buildExtractionFailureResult,
  buildHumanizedResult,
} from "./utils/result";

function clonePatternMap(
  source: Readonly<Record<string, CategorizedPattern>>
): Record<string, CategorizedPattern> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, { ...value }])
  );
}

function filterPatternsForChain(
  patterns: Record<string, CategorizedPattern>,
  chain?: HumanizerChain
): Record<string, CategorizedPattern> {
  if (!chain) {
    return patterns;
  }

  return Object.fromEntries(
    Object.entries(patterns).filter(
      ([, pattern]) => !pattern.chain || pattern.chain === chain
    )
  );
}

function resolvePatternValue(
  value: string | { message: string; category?: ErrorCategory }
): CategorizedPattern {
  if (typeof value === "string") {
    return { message: value, category: "unknown" };
  }

  return {
    message: value.message,
    category: resolveErrorCategory(value.category),
  };
}

export interface LocalHumanizer {
  readonly chain: HumanizerChain | undefined;
  humanize(error: unknown, fallback?: string): string;
  humanizeLocal(error: unknown): string | null;
  humanizeDetailed(error: unknown, fallback?: string): HumanizedResult;
  classify(error: unknown): ErrorCategory;
  isRecoverable(error: unknown): boolean;
  getSuggestion(error: unknown): string;
  getErrorSeverity(error: unknown): ErrorSeverity;
  addPattern(key: string, message: string, category?: ErrorCategory): void;
  addPatterns(
    patterns: Record<
      string,
      string | { message: string; category?: ErrorCategory }
    >
  ): void;
}

/**
 * Isolated humanizer with its own pattern registry.
 * Use this in Next.js, tests, and multi-chain apps instead of process-wide
 * addPattern() mutations.
 */
export function createHumanizer(
  options: CreateHumanizerOptions = {}
): LocalHumanizer {
  const chain = options.chain;
  const fallbackMessage = options.fallbackMessage ?? DEFAULT_FALLBACK_MESSAGE;
  const patterns = filterPatternsForChain(
    clonePatternMap(BUILTIN_CATEGORIZED_PATTERNS),
    chain
  );

  let index: MatchIndex = createMatchIndex(patterns);

  const rebuild = () => {
    index = createMatchIndex(patterns);
  };

  const recognize = (message: string) =>
    matchAgainstIndex(index, message, chain) !== null;

  const matchError = (error: unknown) => {
    const rawMessage = extractRawMessage(error, new WeakSet(), recognize);
    return {
      rawMessage,
      match: matchAgainstIndex(index, rawMessage, chain),
    };
  };

  const addEntries = (
    entries: Array<readonly [string, CategorizedPattern]>
  ) => {
    const batchNormalizedKeys = new Map<string, string>();

    const validated = entries.map(([key, value]) => {
      const normalizedConflicts = getNormalizedKeyConflicts(key, index);
      const isExistingPattern = key in patterns;
      const normalizedKey = normalize(key);
      const existingBatchKey = batchNormalizedKeys.get(normalizedKey);

      if (!isExistingPattern && normalizedConflicts.length > 0) {
        throw new Error(
          `Pattern "${key}" normalizes to an existing key: ${normalizedConflicts.join(", ")}`
        );
      }

      if (existingBatchKey && existingBatchKey !== key) {
        throw new Error(
          `Pattern "${key}" conflicts with another key in the same batch: ${existingBatchKey}`
        );
      }

      batchNormalizedKeys.set(normalizedKey, key);
      return [key, value] as const;
    });

    for (const [key, value] of validated) {
      patterns[key] = value;
    }

    rebuild();
  };

  if (options.patterns) {
    addEntries(
      Object.entries(options.patterns).map(
        ([key, value]) => [key, resolvePatternValue(value)] as const
      )
    );
  }

  return {
    chain,
    humanizeLocal(error: unknown): string | null {
      try {
        return matchError(error).match?.message ?? null;
      } catch {
        return null;
      }
    },
    humanize(error: unknown, fallback: string = fallbackMessage): string {
      try {
        return matchError(error).match?.message ?? fallback;
      } catch {
        return fallback;
      }
    },
    humanizeDetailed(
      error: unknown,
      fallback: string = fallbackMessage
    ): HumanizedResult {
      try {
        const { rawMessage, match } = matchError(error);
        return buildHumanizedResult(match, rawMessage, fallback);
      } catch {
        return buildExtractionFailureResult(fallback);
      }
    },
    classify(error: unknown): ErrorCategory {
      try {
        return matchError(error).match?.category ?? "unknown";
      } catch {
        return "unknown";
      }
    },
    isRecoverable(error: unknown): boolean {
      try {
        const category = matchError(error).match?.category ?? "unknown";
        return getCategoryMeta(category).recoverable;
      } catch {
        return false;
      }
    },
    getSuggestion(error: unknown): string {
      try {
        const category = matchError(error).match?.category ?? "unknown";
        return getCategoryMeta(category).suggestion;
      } catch {
        return getCategoryMeta("unknown").suggestion;
      }
    },
    getErrorSeverity(error: unknown): ErrorSeverity {
      try {
        const category = matchError(error).match?.category ?? "unknown";
        return getCategoryMeta(category).severity;
      } catch {
        return getCategoryMeta("unknown").severity;
      }
    },
    addPattern(
      key: string,
      message: string,
      category: ErrorCategory = "unknown"
    ): void {
      addEntries([
        [
          key,
          {
            message,
            category: resolveErrorCategory(category),
            chain,
          },
        ],
      ]);
    },
    addPatterns(nextPatterns): void {
      addEntries(
        Object.entries(nextPatterns).map(
          ([key, value]) => [key, resolvePatternValue(value)] as const
        )
      );
    },
  };
}
