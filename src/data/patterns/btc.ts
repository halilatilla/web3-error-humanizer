import type { CategorizedPattern } from "../../types";

export const btcPatterns: Record<string, CategorizedPattern> = {
  // Bitcoin / Ordinals Wallet Errors
  "UniSat - Rejected": {
    message: "You declined the request in UniSat wallet.",
    category: "user_rejection",
  },
  "Xverse - Rejected": {
    message: "You declined the request in Xverse wallet.",
    category: "user_rejection",
  },
  "Leather - Rejected": {
    message: "You declined the request in Leather wallet.",
    category: "user_rejection",
  },
  "OKX Wallet - Rejected": {
    message: "You declined the request in OKX Wallet.",
    category: "user_rejection",
  },
  "Insufficient BTC": {
    message: "Not enough BTC for this transaction.",
    category: "insufficient_funds",
  },
  "Invalid PSBT": {
    message: "Invalid transaction format. Please try again.",
    category: "wallet_connection",
  },
  "UTXO not found": {
    message: "Transaction input not found. Please try again.",
    category: "wallet_connection",
  },
};
