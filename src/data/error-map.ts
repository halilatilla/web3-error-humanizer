import type { CategorizedPattern } from "../types";
import { DEFAULT_FALLBACK_MESSAGE } from "./defaults";
import {
  clonePatternMap,
  createLocalErrorMap,
  mergePatternMaps,
} from "./merge-patterns";
import { bridgePatterns } from "./patterns/bridges";
import { btcPatterns } from "./patterns/btc";
import { evmPatterns } from "./patterns/evm";
import { genericPatterns } from "./patterns/generic";
import { solanaPatterns } from "./patterns/solana";
import { suiPatterns } from "./patterns/sui";
import { swapCommonPatterns } from "./patterns/swap-common";
import { tonPatterns } from "./patterns/ton";
import { tronPatterns } from "./patterns/tron";
import { walletPatterns } from "./patterns/wallets";

export { DEFAULT_FALLBACK_MESSAGE };

const BUILTIN_CATEGORIZED_PATTERNS_SOURCE: Record<string, CategorizedPattern> =
  mergePatternMaps([
    { source: genericPatterns },
    { source: walletPatterns },
    { source: evmPatterns, chain: "evm" },
    { source: solanaPatterns, chain: "solana" },
    { source: tronPatterns, chain: "tron" },
    { source: tonPatterns, chain: "ton" },
    { source: suiPatterns, chain: "sui" },
    { source: btcPatterns, chain: "btc" },
    { source: bridgePatterns },
    { source: swapCommonPatterns },
  ]);

export const BUILTIN_CATEGORIZED_PATTERNS: Readonly<
  Record<string, Readonly<CategorizedPattern>>
> = Object.freeze(
  Object.fromEntries(
    Object.entries(BUILTIN_CATEGORIZED_PATTERNS_SOURCE).map(([key, value]) => [
      key,
      Object.freeze({ ...value }),
    ])
  )
);

/** Mutable runtime pattern registry used by matching helpers. */
export const CATEGORIZED_PATTERNS: Record<string, CategorizedPattern> =
  clonePatternMap(BUILTIN_CATEGORIZED_PATTERNS);

/** Read-only snapshot of the built-in messages for tooling and docs. */
export const BUILTIN_LOCAL_ERROR_MAP: Readonly<Record<string, string>> =
  Object.freeze(createLocalErrorMap(BUILTIN_CATEGORIZED_PATTERNS));

/** Backward-compatible flat map (kept in sync with CATEGORIZED_PATTERNS). */
export const LOCAL_ERROR_MAP: Record<string, string> =
  createLocalErrorMap(CATEGORIZED_PATTERNS);

export function syncLocalErrorMap(): void {
  for (const key of Object.keys(LOCAL_ERROR_MAP)) {
    if (!(key in CATEGORIZED_PATTERNS)) {
      LOCAL_ERROR_MAP[key] = undefined as unknown as string;
      Reflect.deleteProperty(LOCAL_ERROR_MAP, key);
    }
  }

  for (const [key, value] of Object.entries(CATEGORIZED_PATTERNS)) {
    LOCAL_ERROR_MAP[key] = value.message;
  }
}

export function resetCustomPatterns(): void {
  for (const key of Object.keys(CATEGORIZED_PATTERNS)) {
    if (!(key in BUILTIN_CATEGORIZED_PATTERNS)) {
      Reflect.deleteProperty(CATEGORIZED_PATTERNS, key);
      continue;
    }

    const builtin = BUILTIN_CATEGORIZED_PATTERNS[key];
    CATEGORIZED_PATTERNS[key] = { ...builtin };
  }

  for (const [key, value] of Object.entries(BUILTIN_CATEGORIZED_PATTERNS)) {
    if (!(key in CATEGORIZED_PATTERNS)) {
      CATEGORIZED_PATTERNS[key] = { ...value };
    }
  }

  syncLocalErrorMap();
}
