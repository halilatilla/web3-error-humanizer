import { CATEGORIZED_PATTERNS } from "../data/error-map";
import type { HumanizerChain } from "../types";
import {
  createMatchIndex,
  getNormalizedKeyConflicts,
  type MatchResult,
  matchAgainstIndex,
} from "./matching";

let globalIndex = createMatchIndex(CATEGORIZED_PATTERNS);

export function rebuildIndex(): void {
  globalIndex = createMatchIndex(CATEGORIZED_PATTERNS);
}

export function getGlobalNormalizedKeyConflicts(key: string): string[] {
  return getNormalizedKeyConflicts(key, globalIndex);
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
