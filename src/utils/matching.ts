import { resolveErrorCategory } from "../data/category-meta";
import { CATEGORIZED_PATTERNS } from "../data/error-map";
import type { ErrorCategory, LocalErrorEntry } from "../types";
import { normalize } from "./normalization";

let exactMatchMap = new Map<string, LocalErrorEntry>();
let codeMap = new Map<string, LocalErrorEntry>();
let sortedSubstringEntries: LocalErrorEntry[] = [];
let normalizedKeyOwners = new Map<string, string[]>();

function buildEntry(
  key: string,
  message: string,
  category: ErrorCategory
): LocalErrorEntry {
  const keyLower = normalize(key);
  const hasSeparator = /[\s:._-]/.test(keyLower);
  const isCode = /^-?\d+$/.test(keyLower);
  const isShortToken = keyLower.length < 4 && !hasSeparator && !isCode;
  return {
    key,
    keyLower,
    message,
    category: resolveErrorCategory(category),
    isCode,
    isShortToken,
  };
}

function buildIndex(): void {
  const newExact = new Map<string, LocalErrorEntry>();
  const newCode = new Map<string, LocalErrorEntry>();
  const newSubstring: LocalErrorEntry[] = [];
  const newOwners = new Map<string, string[]>();

  for (const [key, { message, category }] of Object.entries(
    CATEGORIZED_PATTERNS
  )) {
    const entry = buildEntry(key, message, category);
    const owners = newOwners.get(entry.keyLower) ?? [];
    owners.push(entry.key);
    newOwners.set(entry.keyLower, owners);

    if (!newExact.has(entry.keyLower)) {
      newExact.set(entry.keyLower, entry);
    }

    if (entry.isCode) {
      if (!newCode.has(entry.keyLower)) {
        newCode.set(entry.keyLower, entry);
      }
    } else if (!entry.isShortToken) {
      if (
        !newSubstring.some((candidate) => candidate.keyLower === entry.keyLower)
      ) {
        newSubstring.push(entry);
      }
    }
  }

  newSubstring.sort((a, b) => b.keyLower.length - a.keyLower.length);

  exactMatchMap = newExact;
  codeMap = newCode;
  sortedSubstringEntries = newSubstring;
  normalizedKeyOwners = newOwners;
}

buildIndex();

export function rebuildIndex(): void {
  buildIndex();
}

export function getNormalizedKeyConflicts(key: string): string[] {
  const normalized = normalize(key);
  const owners = normalizedKeyOwners.get(normalized);
  if (!owners) {
    return [];
  }

  return owners.filter((owner) => owner !== key);
}

export interface MatchResult {
  matchedKey: string;
  message: string;
  category: ErrorCategory;
}

/**
 * Match error message against local dictionary with optimized lookup:
 * 1. Exact code match (O(1))
 * 2. Exact phrase match (O(1))
 * 3. Substring match (O(n) but sorted by specificity)
 */
export function matchLocalErrorDetailed(
  rawMessage: string
): MatchResult | null {
  const normalized = normalize(rawMessage);

  const codeMatch = codeMap.get(normalized);
  if (codeMatch) {
    return {
      matchedKey: codeMatch.key,
      message: codeMatch.message,
      category: codeMatch.category,
    };
  }

  const exactMatch = exactMatchMap.get(normalized);
  if (exactMatch) {
    return {
      matchedKey: exactMatch.key,
      message: exactMatch.message,
      category: exactMatch.category,
    };
  }

  for (const entry of sortedSubstringEntries) {
    if (normalized.includes(entry.keyLower)) {
      return {
        matchedKey: entry.key,
        message: entry.message,
        category: entry.category,
      };
    }
  }

  return null;
}
