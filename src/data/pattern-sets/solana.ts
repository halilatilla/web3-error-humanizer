import { mergePatternMaps } from "../merge-patterns";
import { genericPatterns } from "../patterns/generic";
import { solanaPatterns } from "../patterns/solana";
import { walletPatterns } from "../patterns/wallets";

export const solanaPatternSet = mergePatternMaps([
  { source: genericPatterns },
  { source: walletPatterns },
  { source: solanaPatterns, chain: "solana" },
]);
