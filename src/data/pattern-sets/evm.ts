import { mergePatternMaps } from "../merge-patterns";
import { bridgePatterns } from "../patterns/bridges";
import { evmPatterns } from "../patterns/evm";
import { genericPatterns } from "../patterns/generic";
import { swapCommonPatterns } from "../patterns/swap-common";
import { walletPatterns } from "../patterns/wallets";

export const evmPatternSet = mergePatternMaps([
  { source: genericPatterns },
  { source: walletPatterns },
  { source: evmPatterns, chain: "evm" },
  { source: bridgePatterns },
  { source: swapCommonPatterns },
]);
