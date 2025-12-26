import { LOCAL_ERROR_MAP } from "../data/error-map";
import { LocalErrorEntry } from "../types";
import { normalize } from "./normalization";

const LOCAL_ERROR_ENTRIES: LocalErrorEntry[] = Object.entries(
  LOCAL_ERROR_MAP,
).map(([key, message]) => {
  const keyLower = normalize(key);
  const hasSeparator = /[\s:._-]/.test(keyLower);
  const isCode = /^-?\d+$/.test(keyLower);
  const isShortToken = keyLower.length < 4 && !hasSeparator && !isCode;
  return { key, keyLower, message, isCode, isShortToken };
});

// Sort by length so more specific patterns win over generic substrings
const SORTED_LOCAL_ERROR_ENTRIES = [...LOCAL_ERROR_ENTRIES].sort(
  (a, b) => b.keyLower.length - a.keyLower.length,
);

/**
 * Match error message against local dictionary with safer precedence:
 * - Exact code match (e.g., "4001")
 * - Exact phrase match (case-insensitive)
 * - Substring match (case-insensitive), excluding very short tokens to reduce false positives
 */
export function matchLocalErrorDetailed(
  rawMessage: string,
): { matchedKey: string; message: string } | null {
  const normalized = normalize(rawMessage);

  for (const entry of SORTED_LOCAL_ERROR_ENTRIES) {
    // Exact code match
    if (entry.isCode && normalized === entry.keyLower) {
      return { matchedKey: entry.key, message: entry.message };
    }

    // Exact phrase match
    if (normalized === entry.keyLower) {
      return { matchedKey: entry.key, message: entry.message };
    }

    // Substring match (skip short generic tokens to avoid false positives)
    if (!entry.isShortToken && normalized.includes(entry.keyLower)) {
      return { matchedKey: entry.key, message: entry.message };
    }
  }

  return null;
}
