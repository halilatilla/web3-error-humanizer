import type { CategorizedPattern, HumanizerChain } from "../types";

export const DROPPED_KEYS = new Set(["revert", "reverted", "GenericError"]);

export const CATEGORY_OVERRIDES: Record<
  string,
  CategorizedPattern["category"]
> = {
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

export function withChain(
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

export function mergePatternMaps(
  layers: Array<{
    source: Record<string, CategorizedPattern>;
    chain?: HumanizerChain;
  }>
): Record<string, CategorizedPattern> {
  const merged: Record<string, CategorizedPattern> = {};

  for (const layer of layers) {
    Object.assign(merged, withChain(layer.source, layer.chain));
  }

  return Object.fromEntries(
    Object.entries(merged).filter(([key]) => !DROPPED_KEYS.has(key))
  );
}

export function clonePatternMap(
  source: Readonly<Record<string, CategorizedPattern>>
): Record<string, CategorizedPattern> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, { ...value }])
  );
}

export function createLocalErrorMap(
  source: Readonly<Record<string, CategorizedPattern>>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, value.message])
  );
}
