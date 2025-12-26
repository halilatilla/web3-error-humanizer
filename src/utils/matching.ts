import { LOCAL_ERROR_MAP } from "../data/error-map";
import type { LocalErrorEntry } from "../types";
import { normalize } from "./normalization";

// Pre-compute entries once at module load
const LOCAL_ERROR_ENTRIES: LocalErrorEntry[] = Object.entries(
  LOCAL_ERROR_MAP
).map(([key, message]) => {
  const keyLower = normalize(key);
  const hasSeparator = /[\s:._-]/.test(keyLower);
  const isCode = /^-?\d+$/.test(keyLower);
  const isShortToken = keyLower.length < 4 && !hasSeparator && !isCode;
  return { key, keyLower, message, isCode, isShortToken };
});

// Create lookup maps for faster matching
const EXACT_MATCH_MAP = new Map<string, LocalErrorEntry>();
const CODE_MAP = new Map<string, LocalErrorEntry>();

// Sort by length (longest first) for substring matching
const SORTED_SUBSTRING_ENTRIES: LocalErrorEntry[] = [];

for (const entry of LOCAL_ERROR_ENTRIES) {
  // Index exact matches
  EXACT_MATCH_MAP.set(entry.keyLower, entry);

  // Index codes separately
  if (entry.isCode) {
    CODE_MAP.set(entry.keyLower, entry);
  } else {
    // Only add non-codes to substring matching (skip short tokens)
    if (!entry.isShortToken) {
      SORTED_SUBSTRING_ENTRIES.push(entry);
    }
  }
}

// Sort substring entries by length (longest first) for better specificity
SORTED_SUBSTRING_ENTRIES.sort((a, b) => b.keyLower.length - a.keyLower.length);

/**
 * Match error message against local dictionary with optimized lookup:
 * 1. Exact code match (O(1))
 * 2. Exact phrase match (O(1))
 * 3. Substring match (O(n) but sorted by specificity)
 */
export function matchLocalErrorDetailed(
  rawMessage: string
): { matchedKey: string; message: string } | null {
  const normalized = normalize(rawMessage);

  // 1. Try exact code match first (fastest)
  const codeMatch = CODE_MAP.get(normalized);
  if (codeMatch) {
    return { matchedKey: codeMatch.key, message: codeMatch.message };
  }

  // 2. Try exact phrase match
  const exactMatch = EXACT_MATCH_MAP.get(normalized);
  if (exactMatch) {
    return { matchedKey: exactMatch.key, message: exactMatch.message };
  }

  // 3. Try substring match (sorted by length for specificity)
  for (const entry of SORTED_SUBSTRING_ENTRIES) {
    if (normalized.includes(entry.keyLower)) {
      return { matchedKey: entry.key, message: entry.message };
    }
  }

  return null;
}
