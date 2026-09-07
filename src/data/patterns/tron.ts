import type { CategorizedPattern } from "../../types";

export const tronPatterns: Record<string, CategorizedPattern> = {
  // Tron / TronLink Errors
  "TronLink - Rejected": {
    message: "You declined the request in TronLink.",
    category: "user_rejection",
  },
  "TronLink - Cancelled": {
    message: "You cancelled the request in TronLink.",
    category: "user_rejection",
  },
  "TronLink not installed": {
    message: "Please install TronLink wallet extension.",
    category: "wallet_connection",
  },
  "TronLink is locked": {
    message: "TronLink is locked. Please unlock it first.",
    category: "wallet_connection",
  },
  "TronLink not ready": {
    message: "TronLink is not ready. Please wait and try again.",
    category: "wallet_connection",
  },
  "Confirmation declined by user": {
    message: "You declined the transaction in TronLink.",
    category: "user_rejection",
  },
  BANDWITH: {
    message: "Not enough bandwidth for this transaction. Please freeze TRX.",
    category: "wallet_connection",
  },
  BANDWIDTH: {
    message: "Not enough bandwidth. Please freeze TRX for bandwidth.",
    category: "wallet_connection",
  },
  ENERGY: {
    message:
      "Not enough energy for this transaction. Please freeze TRX for energy.",
    category: "wallet_connection",
  },
  BALANCE_NOT_SUFFICIENT: {
    message: "Insufficient TRX balance.",
    category: "insufficient_funds",
  },
  CONTRACT_VALIDATE_ERROR: {
    message: "Contract validation failed. Please check your inputs.",
    category: "wallet_connection",
  },
  REVERT: {
    message: "Transaction reverted. Please check your inputs.",
    category: "wallet_connection",
  },
  OUT_OF_ENERGY: {
    message:
      "Out of energy. Please freeze TRX or reduce transaction complexity.",
    category: "wallet_connection",
  },
  "Account resource insufficient": {
    message: "Not enough bandwidth or energy. Please freeze TRX.",
    category: "wallet_connection",
  },
  "Contract not found": {
    message: "Smart contract not found. Please check the address.",
    category: "wallet_connection",
  },
  "FoxWallet - Rejected": {
    message: "You declined the request in FoxWallet.",
    category: "user_rejection",
  },
};
