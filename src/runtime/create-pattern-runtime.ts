import { createHumanizerFromPatterns } from "../create-humanizer";
import { getCategoryMeta, resolveErrorCategory } from "../data/category-meta";
import { DEFAULT_FALLBACK_MESSAGE } from "../data/defaults";
import { clonePatternMap } from "../data/merge-patterns";
import type {
  CategorizedPattern,
  CreateHumanizerOptions,
  ErrorCategory,
  ErrorSeverity,
  HumanizedResult,
} from "../types";
import { extractRawMessage } from "../utils/extraction";
import {
  createMatchIndex,
  getNormalizedKeyConflicts,
  type MatchIndex,
  matchAgainstIndex,
} from "../utils/matching";
import { normalize } from "../utils/normalization";
import {
  buildExtractionFailureResult,
  buildHumanizedResult,
} from "../utils/result";

export function createPatternRuntime(
  builtinPatterns: Record<string, CategorizedPattern>
) {
  const patterns = clonePatternMap(builtinPatterns);
  let index: MatchIndex = createMatchIndex(patterns);

  const rebuild = () => {
    index = createMatchIndex(patterns);
  };

  const recognize = (message: string) =>
    matchAgainstIndex(index, message) !== null;

  const extract = (error: unknown) =>
    extractRawMessage(error, new WeakSet(), recognize);

  const matchError = (error: unknown) => {
    const rawMessage = extract(error);
    return {
      rawMessage,
      match: matchAgainstIndex(index, rawMessage),
    };
  };

  const resetCustomPatterns = () => {
    for (const key of Object.keys(patterns)) {
      if (!(key in builtinPatterns)) {
        Reflect.deleteProperty(patterns, key);
      } else {
        patterns[key] = { ...builtinPatterns[key] };
      }
    }

    for (const [key, value] of Object.entries(builtinPatterns)) {
      if (!(key in patterns)) {
        patterns[key] = { ...value };
      }
    }

    rebuild();
  };

  const addPattern = (
    key: string,
    message: string,
    category: ErrorCategory = "unknown"
  ): void => {
    const normalizedConflicts = getNormalizedKeyConflicts(key, index);
    const isExistingPattern = key in patterns;

    if (!isExistingPattern && normalizedConflicts.length > 0) {
      throw new Error(
        `Pattern "${key}" normalizes to an existing key: ${normalizedConflicts.join(", ")}`
      );
    }

    patterns[key] = {
      message,
      category: resolveErrorCategory(category),
    };
    rebuild();
  };

  const addPatterns = (
    nextPatterns: Record<
      string,
      string | { message: string; category?: ErrorCategory }
    >
  ): void => {
    const batchNormalizedKeys = new Map<string, string>();
    const nextEntries = Object.entries(nextPatterns).map(([key, value]) => {
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

      return [
        key,
        typeof value === "string"
          ? { message: value, category: "unknown" as ErrorCategory }
          : {
              message: value.message,
              category: resolveErrorCategory(value.category),
            },
      ] as const;
    });

    for (const [key, value] of nextEntries) {
      patterns[key] = value;
    }

    rebuild();
  };

  const humanizeErrorLocal = (error: unknown): string | null => {
    try {
      return matchError(error).match?.message ?? null;
    } catch {
      return null;
    }
  };

  const humanizeError = (
    error: unknown,
    fallback: string = DEFAULT_FALLBACK_MESSAGE
  ): string => {
    try {
      return humanizeErrorLocal(error) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const humanizeErrorDetailed = (
    error: unknown,
    fallback: string = DEFAULT_FALLBACK_MESSAGE
  ): HumanizedResult => {
    try {
      const { rawMessage, match } = matchError(error);
      return buildHumanizedResult(match, rawMessage, fallback);
    } catch {
      return buildExtractionFailureResult(fallback);
    }
  };

  const classifyError = (error: unknown): ErrorCategory => {
    try {
      return matchError(error).match?.category ?? "unknown";
    } catch {
      return "unknown";
    }
  };

  const isRecoverable = (error: unknown): boolean => {
    return getCategoryMeta(classifyError(error)).recoverable;
  };

  const getSuggestion = (error: unknown): string => {
    return getCategoryMeta(classifyError(error)).suggestion;
  };

  const getErrorSeverity = (error: unknown): ErrorSeverity => {
    return getCategoryMeta(classifyError(error)).severity;
  };

  return {
    humanizeError,
    humanizeErrorLocal,
    humanizeErrorDetailed,
    classifyError,
    isRecoverable,
    getSuggestion,
    getErrorSeverity,
    addPattern,
    addPatterns,
    resetCustomPatterns,
    getLocalErrorCount: () => Object.keys(patterns).length,
    hasLocalPattern: (pattern: string) => pattern in patterns,
    getLocalPatterns: () => Object.keys(patterns),
    createHumanizer: (options: CreateHumanizerOptions = {}) =>
      createHumanizerFromPatterns(builtinPatterns, options),
    extractRawMessage: (
      error: unknown,
      seen?: WeakSet<object>,
      isRecognized?: (message: string) => boolean
    ) =>
      extractRawMessage(
        error,
        seen ?? new WeakSet(),
        isRecognized ?? recognize
      ),
  };
}
