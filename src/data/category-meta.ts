import type { CategoryMeta, ErrorCategory } from "../types";

export const CATEGORY_META: Record<ErrorCategory, CategoryMeta> = {
  user_rejection: {
    severity: "info",
    recoverable: true,
    suggestion: "No action needed — you chose to cancel.",
  },
  insufficient_funds: {
    severity: "error",
    recoverable: true,
    suggestion: "Add more funds to your wallet and try again.",
  },
  insufficient_allowance: {
    severity: "warning",
    recoverable: true,
    suggestion: "Approve the token before proceeding.",
  },
  slippage: {
    severity: "warning",
    recoverable: true,
    suggestion: "Increase your slippage tolerance or try a smaller amount.",
  },
  liquidity: {
    severity: "error",
    recoverable: true,
    suggestion: "Try a smaller amount or wait for more liquidity.",
  },
  gas: {
    severity: "error",
    recoverable: true,
    suggestion: "Increase the gas limit or wait for lower gas prices.",
  },
  nonce: {
    severity: "warning",
    recoverable: true,
    suggestion:
      "Wait for pending transactions to complete or reset your nonce.",
  },
  network: {
    severity: "error",
    recoverable: true,
    suggestion: "Check your internet connection and try again.",
  },
  contract_error: {
    severity: "error",
    recoverable: false,
    suggestion:
      "The smart contract rejected this transaction. Check your inputs.",
  },
  timeout: {
    severity: "warning",
    recoverable: true,
    suggestion:
      "The transaction may still succeed. Check your wallet for updates.",
  },
  wallet_connection: {
    severity: "error",
    recoverable: true,
    suggestion: "Connect your wallet and try again.",
  },
  chain_mismatch: {
    severity: "warning",
    recoverable: true,
    suggestion: "Switch to the correct network in your wallet.",
  },
  protocol_limit: {
    severity: "error",
    recoverable: true,
    suggestion:
      "The protocol has reached its limit. Try a smaller amount or wait.",
  },
  signature: {
    severity: "error",
    recoverable: true,
    suggestion: "Try signing the message again.",
  },
  bridge: {
    severity: "error",
    recoverable: true,
    suggestion: "Check the bridge status page or try again later.",
  },
  unknown: {
    severity: "error",
    recoverable: false,
    suggestion: "Please try again. If the issue persists, contact support.",
  },
};

export function isErrorCategory(value: unknown): value is ErrorCategory {
  return typeof value === "string" && value in CATEGORY_META;
}

export function resolveErrorCategory(value: unknown): ErrorCategory {
  return isErrorCategory(value) ? value : "unknown";
}

export function getCategoryMeta(value: unknown): CategoryMeta {
  return CATEGORY_META[resolveErrorCategory(value)];
}
