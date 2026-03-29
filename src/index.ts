import { getCategoryMeta, resolveErrorCategory } from "./data/category-meta";
import {
  CATEGORIZED_PATTERNS,
  DEFAULT_FALLBACK_MESSAGE,
  syncLocalErrorMap,
} from "./data/error-map";
import type { ErrorCategory, ErrorSeverity, HumanizedResult } from "./types";
import { extractRawMessage } from "./utils/extraction";
import {
  getNormalizedKeyConflicts,
  matchLocalErrorDetailed,
  rebuildIndex,
} from "./utils/matching";
import { normalize } from "./utils/normalization";

export { CATEGORY_META } from "./data/category-meta";
export {
  BUILTIN_CATEGORIZED_PATTERNS,
  BUILTIN_LOCAL_ERROR_MAP,
  CATEGORIZED_PATTERNS,
  DEFAULT_FALLBACK_MESSAGE,
  LOCAL_ERROR_MAP,
  resetCustomPatterns,
} from "./data/error-map";
export * from "./types";
export { extractRawMessage } from "./utils/extraction";

function buildResult(
  match: {
    matchedKey: string;
    message: string;
    category: ErrorCategory;
  } | null,
  rawMessage: string,
  fallback: string
): HumanizedResult {
  if (match) {
    const meta = getCategoryMeta(match.category);
    return {
      message: match.message,
      source: "local",
      category: resolveErrorCategory(match.category),
      severity: meta.severity,
      suggestion: meta.suggestion,
      recoverable: meta.recoverable,
      matchedKey: match.matchedKey,
      rawMessage,
    };
  }
  const meta = getCategoryMeta("unknown");
  return {
    message: fallback,
    source: "fallback",
    category: "unknown",
    severity: meta.severity,
    suggestion: meta.suggestion,
    recoverable: meta.recoverable,
    rawMessage,
  };
}

/**
 * Humanize error using ONLY the local dictionary (no API key needed).
 * Returns null if no match found.
 */
export function humanizeErrorLocal(error: unknown): string | null {
  try {
    const rawMessage = extractRawMessage(error);
    const match = matchLocalErrorDetailed(rawMessage);
    return match ? match.message : null;
  } catch {
    return null;
  }
}

/**
 * Humanize error using local dictionary with a fallback message.
 * No API key needed -- completely free and instant.
 */
export function humanizeError(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE
): string {
  try {
    return humanizeErrorLocal(error) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Humanize an error and return rich metadata including category, severity,
 * suggestion, and whether the error is recoverable.
 */
export function humanizeErrorDetailed(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE
): HumanizedResult {
  try {
    const rawMessage = extractRawMessage(error);
    const match = matchLocalErrorDetailed(rawMessage);
    return buildResult(match, rawMessage, fallback);
  } catch {
    const meta = getCategoryMeta("unknown");
    return {
      message: fallback,
      source: "fallback",
      category: "unknown",
      severity: meta.severity,
      suggestion: meta.suggestion,
      recoverable: meta.recoverable,
      rawMessage: "Error extraction failed",
    };
  }
}

/**
 * Classify an error into a category without humanizing it.
 * Returns "unknown" if no local match is found.
 */
export function classifyError(error: unknown): ErrorCategory {
  try {
    const rawMessage = extractRawMessage(error);
    const match = matchLocalErrorDetailed(rawMessage);
    return match ? match.category : "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Check whether an error is recoverable (user can take action to fix it).
 */
export function isRecoverable(error: unknown): boolean {
  const category = classifyError(error);
  return getCategoryMeta(category).recoverable;
}

/**
 * Get a suggested next action for the user based on the error.
 */
export function getSuggestion(error: unknown): string {
  const category = classifyError(error);
  return getCategoryMeta(category).suggestion;
}

/**
 * Get the severity level for an error.
 */
export function getErrorSeverity(error: unknown): ErrorSeverity {
  const category = classifyError(error);
  return getCategoryMeta(category).severity;
}

/**
 * Get the count of locally supported error patterns.
 */
export function getLocalErrorCount(): number {
  return Object.keys(CATEGORIZED_PATTERNS).length;
}

/**
 * Check if an error pattern exists in the local dictionary.
 */
export function hasLocalPattern(pattern: string): boolean {
  return pattern in CATEGORIZED_PATTERNS;
}

/**
 * Get all supported error patterns (keys only).
 */
export function getLocalPatterns(): string[] {
  return Object.keys(CATEGORIZED_PATTERNS);
}

/**
 * Add a single error pattern to the local dictionary.
 * Automatically rebuilds internal lookup indexes.
 */
export function addPattern(
  key: string,
  message: string,
  category: ErrorCategory = "unknown"
): void {
  const normalizedConflicts = getNormalizedKeyConflicts(key);
  const isExistingPattern = key in CATEGORIZED_PATTERNS;

  if (!isExistingPattern && normalizedConflicts.length > 0) {
    throw new Error(
      `Pattern "${key}" normalizes to an existing key: ${normalizedConflicts.join(", ")}`
    );
  }

  CATEGORIZED_PATTERNS[key] = {
    message,
    category: resolveErrorCategory(category),
  };
  syncLocalErrorMap();
  rebuildIndex();
}

/**
 * Add multiple error patterns to the local dictionary at once.
 * Automatically rebuilds internal lookup indexes.
 *
 * Validation runs eagerly via .map() before any mutation, so if a key
 * conflicts the function throws without modifying the registry.
 */
export function addPatterns(
  patterns: Record<
    string,
    string | { message: string; category?: ErrorCategory }
  >
): void {
  const batchNormalizedKeys = new Map<string, string>();
  const nextEntries = Object.entries(patterns).map(([key, value]) => {
    const normalizedConflicts = getNormalizedKeyConflicts(key);
    const isExistingPattern = key in CATEGORIZED_PATTERNS;
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
    CATEGORIZED_PATTERNS[key] = value;
  }

  syncLocalErrorMap();
  rebuildIndex();
}
