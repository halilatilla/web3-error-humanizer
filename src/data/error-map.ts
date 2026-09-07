import type { CategorizedPattern, HumanizerChain } from "../types";
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

export const DEFAULT_FALLBACK_MESSAGE = "Transaction failed. Please try again.";

const DROPPED_KEYS = new Set(["revert", "reverted", "GenericError"]);

const CATEGORY_OVERRIDES: Record<string, CategorizedPattern["category"]> = {
  INSUFFICIENT_LIQUIDITY: "liquidity",
  InsufficientLiquidity: "liquidity",
  REVERT: "contract_error",
  OUT_OF_ENERGY: "gas",
  ENERGY: "gas",
  InvalidArgument: "contract_error",
  IncorrectProgramId: "contract_error",
  InvalidInstructionData: "contract_error",
  AccountDataTooSmall: "contract_error",
  InstructionError: "contract_error",
  InvalidAccountData: "contract_error",
  "0x1": "unknown",
};

function withChain(
  source: Record<string, CategorizedPattern>,
  chain?: HumanizerChain
): Record<string, CategorizedPattern> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [
      key,
      {
        ...value,
        category: CATEGORY_OVERRIDES[key] ?? value.category,
        ...(chain ? { chain } : {}),
      },
    ])
  );
}

const BUILTIN_CATEGORIZED_PATTERNS_SOURCE: Record<string, CategorizedPattern> =
  Object.fromEntries(
    Object.entries({
      ...withChain(genericPatterns),
      ...withChain(walletPatterns),
      ...withChain(evmPatterns, "evm"),
      ...withChain(solanaPatterns, "solana"),
      ...withChain(tronPatterns, "tron"),
      ...withChain(tonPatterns, "ton"),
      ...withChain(suiPatterns, "sui"),
      ...withChain(btcPatterns, "btc"),
      ...withChain(bridgePatterns),
      ...withChain(swapCommonPatterns),
    }).filter(([key]) => !DROPPED_KEYS.has(key))
  );

function clonePatternMap(
  source: Readonly<Record<string, CategorizedPattern>>
): Record<string, CategorizedPattern> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, { ...value }])
  );
}

function createLocalErrorMap(
  source: Readonly<Record<string, CategorizedPattern>>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, value.message])
  );
}

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
