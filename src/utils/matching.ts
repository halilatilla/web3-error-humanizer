import { resolveErrorCategory } from "../data/category-meta";
import { CATEGORIZED_PATTERNS } from "../data/error-map";
import type {
  CategorizedPattern,
  ErrorCategory,
  HumanizerChain,
  LocalErrorEntry,
} from "../types";
import { normalize } from "./normalization";

const CATEGORY_PRIORITY: Record<ErrorCategory, number> = {
  user_rejection: 100,
  insufficient_allowance: 90,
  insufficient_funds: 85,
  chain_mismatch: 80,
  slippage: 75,
  gas: 70,
  nonce: 65,
  liquidity: 60,
  signature: 50,
  wallet_connection: 45,
  timeout: 40,
  network: 35,
  bridge: 30,
  protocol_limit: 25,
  contract_error: 10,
  unknown: 0,
};

const EXACT_ONLY_NORMALIZED = new Set([
  "timeout",
  "old",
  "energy",
  "absurd",
  "mev",
  "revert",
  "reverted",
  "genericerror",
]);

const EMBEDDED_NUMERIC_CODES = new Set([
  "4001",
  "4100",
  "4200",
  "4900",
  "4901",
]);

export interface MatchIndex {
  exactMatchMap: Map<string, LocalErrorEntry>;
  codeMap: Map<string, LocalErrorEntry>;
  substringEntries: LocalErrorEntry[];
  normalizedKeyOwners: Map<string, string[]>;
}

export interface MatchResult {
  matchedKey: string;
  message: string;
  category: ErrorCategory;
  code?: string;
}

type MatchKind = "exact" | "code-token" | "bounded" | "raw";

const MATCH_KIND_SCORE: Record<MatchKind, number> = {
  exact: 300,
  "code-token": 200,
  bounded: 100,
  raw: 0,
};

function isHexCode(keyLower: string): boolean {
  return /^0x[\da-f]+$/.test(keyLower);
}

function isNumericCode(keyLower: string): boolean {
  return /^-?\d+$/.test(keyLower);
}

function canMatchCodeAsToken(keyLower: string): boolean {
  if (isHexCode(keyLower)) {
    return true;
  }
  if (/^-32\d{3}$/.test(keyLower)) {
    return true;
  }
  if (/^-320(0\d|1[0-5])$/.test(keyLower)) {
    return true;
  }
  return EMBEDDED_NUMERIC_CODES.has(keyLower);
}

function isTokenBounded(
  haystack: string,
  needle: string,
  index: number
): boolean {
  const before =
    index === 0 || !/[\p{L}\p{N}]/u.test(haystack[index - 1] ?? "");
  const afterIndex = index + needle.length;
  const after =
    afterIndex >= haystack.length ||
    !/[\p{L}\p{N}]/u.test(haystack[afterIndex] ?? "");
  return before && after;
}

function findBoundedIndex(haystack: string, needle: string): number {
  let from = 0;
  while (from <= haystack.length - needle.length) {
    const index = haystack.indexOf(needle, from);
    if (index === -1) {
      return -1;
    }
    if (isTokenBounded(haystack, needle, index)) {
      return index;
    }
    from = index + 1;
  }
  return -1;
}

export function buildEntry(
  key: string,
  message: string,
  category: ErrorCategory,
  chain?: HumanizerChain
): LocalErrorEntry {
  const keyLower = normalize(key);
  const hasSeparator = /[\s:._-]/.test(keyLower);
  const isCode = isNumericCode(keyLower);
  const hexCode = isHexCode(keyLower);
  const isShortToken =
    keyLower.length < 4 && !hasSeparator && !isCode && !hexCode;

  return {
    key,
    keyLower,
    message,
    category: resolveErrorCategory(category),
    isCode,
    isShortToken,
    isHexCode: hexCode,
    exactOnly: EXACT_ONLY_NORMALIZED.has(keyLower) || isShortToken,
    chain,
  };
}

export function createMatchIndex(
  patterns: Record<string, CategorizedPattern>
): MatchIndex {
  const exactMatchMap = new Map<string, LocalErrorEntry>();
  const codeMap = new Map<string, LocalErrorEntry>();
  const substringEntries: LocalErrorEntry[] = [];
  const normalizedKeyOwners = new Map<string, string[]>();

  for (const [key, pattern] of Object.entries(patterns)) {
    const entry = buildEntry(
      key,
      pattern.message,
      pattern.category,
      pattern.chain
    );
    const owners = normalizedKeyOwners.get(entry.keyLower) ?? [];
    owners.push(entry.key);
    normalizedKeyOwners.set(entry.keyLower, owners);

    if (!exactMatchMap.has(entry.keyLower)) {
      exactMatchMap.set(entry.keyLower, entry);
    }

    if (entry.isCode || entry.isHexCode) {
      if (!codeMap.has(entry.keyLower)) {
        codeMap.set(entry.keyLower, entry);
      }
      continue;
    }

    if (entry.exactOnly) {
      continue;
    }

    if (
      !substringEntries.some(
        (candidate) => candidate.keyLower === entry.keyLower
      )
    ) {
      substringEntries.push(entry);
    }
  }

  substringEntries.sort((a, b) => b.keyLower.length - a.keyLower.length);

  return {
    exactMatchMap,
    codeMap,
    substringEntries,
    normalizedKeyOwners,
  };
}

let globalIndex = createMatchIndex(CATEGORIZED_PATTERNS);

export function rebuildIndex(): void {
  globalIndex = createMatchIndex(CATEGORIZED_PATTERNS);
}

export function getNormalizedKeyConflicts(
  key: string,
  index: MatchIndex = globalIndex
): string[] {
  const normalized = normalize(key);
  const owners = index.normalizedKeyOwners.get(normalized);
  if (!owners) {
    return [];
  }

  return owners.filter((owner) => owner !== key);
}

function isChainAllowed(
  entry: LocalErrorEntry,
  chain?: HumanizerChain
): boolean {
  if (!chain || !entry.chain) {
    return true;
  }
  return entry.chain === chain;
}

function toMatchResult(entry: LocalErrorEntry): MatchResult {
  return {
    matchedKey: entry.key,
    message: entry.message,
    category: entry.category,
    code: entry.isCode || entry.isHexCode ? entry.key : undefined,
  };
}

function scoreEntry(entry: LocalErrorEntry, kind: MatchKind): number {
  return (
    MATCH_KIND_SCORE[kind] * 1000 +
    CATEGORY_PRIORITY[entry.category] * 10 +
    entry.keyLower.length
  );
}

export function matchAgainstIndex(
  index: MatchIndex,
  rawMessage: string,
  chain?: HumanizerChain
): MatchResult | null {
  const normalized = normalize(rawMessage);
  if (!normalized) {
    return null;
  }

  const exactCode = index.codeMap.get(normalized);
  if (exactCode && isChainAllowed(exactCode, chain)) {
    return toMatchResult(exactCode);
  }

  const exactMatch = index.exactMatchMap.get(normalized);
  if (exactMatch && isChainAllowed(exactMatch, chain)) {
    return toMatchResult(exactMatch);
  }

  const candidates: Array<{ entry: LocalErrorEntry; score: number }> = [];

  const consider = (entry: LocalErrorEntry, kind: MatchKind) => {
    if (!isChainAllowed(entry, chain)) {
      return;
    }
    candidates.push({ entry, score: scoreEntry(entry, kind) });
  };

  for (const entry of index.codeMap.values()) {
    if (!canMatchCodeAsToken(entry.keyLower)) {
      continue;
    }
    if (findBoundedIndex(normalized, entry.keyLower) !== -1) {
      consider(entry, "code-token");
    }
  }

  for (const entry of index.substringEntries) {
    const indexOf = normalized.indexOf(entry.keyLower);
    if (indexOf === -1) {
      continue;
    }
    const bounded = isTokenBounded(normalized, entry.keyLower, indexOf);
    consider(entry, bounded ? "bounded" : "raw");
  }

  if (candidates.length === 0) {
    return null;
  }

  const best = candidates.reduce((winner, candidate) =>
    candidate.score > winner.score ? candidate : winner
  );
  return toMatchResult(best.entry);
}

/**
 * Match error message against the process-wide dictionary:
 * 1. Exact code / phrase
 * 2. Embedded RPC and hex codes
 * 3. Scored substring matches (category priority, then length)
 */
export function matchLocalErrorDetailed(
  rawMessage: string,
  chain?: HumanizerChain
): MatchResult | null {
  return matchAgainstIndex(globalIndex, rawMessage, chain);
}
