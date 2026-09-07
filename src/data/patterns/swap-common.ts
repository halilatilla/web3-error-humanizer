import type { CategorizedPattern } from "../../types";

/**
 * Cross-app swap / wallet phrases that Houdini and other DEX UIs hit often.
 * English copy only — apps with i18n should map category / matchedKey.
 */
export const swapCommonPatterns: Record<string, CategorizedPattern> = {
  "User denied transaction signature": {
    message: "You cancelled the transaction in your wallet.",
    category: "user_rejection",
  },
  "User rejected the request": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "was not broadcast to the network": {
    message:
      "The transaction was not broadcast to the network. Please try again.",
    category: "network",
  },
  "was replaced in your wallet": {
    message: "This transaction was replaced in your wallet.",
    category: "nonce",
  },
  "was cancelled in your wallet": {
    message: "The transaction was cancelled in your wallet.",
    category: "user_rejection",
  },
  "could not be verified with the network": {
    message: "The network could not verify this transaction. Please try again.",
    category: "network",
  },
  "has not been authorized by the user.": {
    message:
      "This wallet is not authorized. Disconnect and reconnect, then try again.",
    category: "wallet_connection",
  },
  "gas required exceeds allowance": {
    message: "This transaction needs more gas than your wallet allowed.",
    category: "gas",
  },
  "not enough native for fees": {
    message: "You don't have enough native token to pay network fees.",
    category: "insufficient_funds",
  },
  "fail swap, not enough fee": {
    message: "The swap failed because the network fee was too low.",
    category: "gas",
  },
  "insufficient native currency sent": {
    message: "Not enough native token was sent to cover this transaction.",
    category: "insufficient_funds",
  },
  "insufficient funds for intrinsic gas": {
    message: "You don't have enough gas to send this transaction.",
    category: "gas",
  },
  "insufficient funds for gas": {
    message: "You don't have enough gas to send this transaction.",
    category: "gas",
  },
  "gas limit exceeded": {
    message: "The transaction ran out of gas. Try increasing the gas limit.",
    category: "gas",
  },
  "intrinsic gas too low": {
    message: "The gas limit is too low for this transaction.",
    category: "gas",
  },
  "transaction underpriced": {
    message: "The gas price is too low. Increase it and try again.",
    category: "gas",
  },
  "replacement transaction underpriced": {
    message:
      "Fee is too low to replace the pending transaction. Increase the gas fee.",
    category: "nonce",
  },
  "nonce too high": {
    message:
      "Transaction nonce is too high. Reset your wallet nonce and try again.",
    category: "nonce",
  },
  "gas limit reached": {
    message: "This transaction exceeds the block gas limit.",
    category: "gas",
  },
  "exceeds block gas limit": {
    message: "This transaction exceeds the block gas limit.",
    category: "gas",
  },
  "does not have a transaction hash": {
    message: "The wallet did not return a transaction hash. Please try again.",
    category: "wallet_connection",
  },
  "attempting to switch chain": {
    message: "Switch to the correct network in your wallet and try again.",
    category: "chain_mismatch",
  },
  "0x1772": {
    message:
      "The swap route is no longer valid. Refresh the quote and try again.",
    category: "slippage",
    chain: "solana",
  },
  "0x1787": {
    message:
      "This Solana pool route is invalid. Refresh the quote and try again.",
    category: "liquidity",
    chain: "solana",
  },
  RequireGteViolated: {
    message:
      "The swap received less than the minimum amount. Try increasing slippage.",
    category: "slippage",
    chain: "solana",
  },
  "Token account not found": {
    message:
      "The token account was not found. You may need to create it first.",
    category: "wallet_connection",
    chain: "solana",
  },
  "Route not found": {
    message: "No swap route was found for this pair. Try a different amount.",
    category: "liquidity",
  },
  "Price impact too high": {
    message: "Price impact is too high. Try a smaller amount.",
    category: "slippage",
  },
  "insufficient lamports": {
    message: "Not enough SOL to pay for this transaction.",
    category: "insufficient_funds",
    chain: "solana",
  },
  "cell underflow": {
    message: "This TON message is malformed. Refresh and try again.",
    category: "contract_error",
    chain: "ton",
  },
  "cell overflow": {
    message: "This TON message is too large. Try a simpler transaction.",
    category: "contract_error",
    chain: "ton",
  },
  "invalid seqno": {
    message: "The TON wallet sequence number is out of date. Try again.",
    category: "nonce",
    chain: "ton",
  },
  "tx bounced": {
    message:
      "The TON transaction bounced. Check the destination and try again.",
    category: "contract_error",
    chain: "ton",
  },
  "bounced transaction": {
    message:
      "The TON transaction bounced. Check the destination and try again.",
    category: "contract_error",
    chain: "ton",
  },
  "object not found": {
    message: "A required Sui object was not found. Refresh and try again.",
    category: "contract_error",
    chain: "sui",
  },
  "package not found": {
    message: "The Sui package was not found. Refresh and try again.",
    category: "contract_error",
    chain: "sui",
  },
  "not enough coins": {
    message: "You don't have enough coins for this Sui transaction.",
    category: "insufficient_funds",
    chain: "sui",
  },
};
