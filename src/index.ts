import { DEFAULT_FALLBACK_MESSAGE, LOCAL_ERROR_MAP } from "./data/error-map";
import type { HumanizedResult } from "./types";
import { extractRawMessage } from "./utils/extraction";
import { matchLocalErrorDetailed, rebuildIndex } from "./utils/matching";

export { DEFAULT_FALLBACK_MESSAGE, LOCAL_ERROR_MAP } from "./data/error-map";
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
  } catch {
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
  } catch {
    return fallback;
  }
}

/**
 * Humanize an error and return metadata about the result.
 * Local-only; falls back to provided message when no match.
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
  } catch {
    return {
      message: fallback,
      source: "fallback",
      rawMessage: "Error extraction failed",
    };
  }
}

/**
 * Get the count of locally supported error patterns.
 */
export function getLocalErrorCount(): number {
  return Object.keys(LOCAL_ERROR_MAP).length;
}

/**
 * Check if an error pattern exists in the local dictionary.
 */
export function hasLocalPattern(pattern: string): boolean {
  return pattern in LOCAL_ERROR_MAP;
}

/**
 * Get all supported error patterns (keys only).
 */
export function getLocalPatterns(): string[] {
  return Object.keys(LOCAL_ERROR_MAP);
}

/**
 * Add a single error pattern to the local dictionary.
 * Automatically rebuilds internal lookup indexes.
 *
 * @example
 * addPattern("CUSTOM_DEX_ERROR", "Your custom message here.");
 */
export function addPattern(key: string, message: string): void {
  LOCAL_ERROR_MAP[key] = message;
  rebuildIndex();
}

/**
 * Add multiple error patterns to the local dictionary at once.
 * Automatically rebuilds internal lookup indexes.
 *
 * @example
 * addPatterns({
 *   "CUSTOM_DEX_ERROR": "Your custom message here.",
 *   "MyProtocol: SLIPPAGE": "Price moved. Increase slippage.",
 * });
 */
export function addPatterns(patterns: Record<string, string>): void {
  for (const [key, message] of Object.entries(patterns)) {
    LOCAL_ERROR_MAP[key] = message;
  }
  rebuildIndex();
}
