import type { CategorizedPattern } from "../../types";

export const bridgePatterns: Record<string, CategorizedPattern> = {
  // Cross-Chain / Bridge Errors
  "Bridge error": {
    message: "Cross-chain bridge error. Please try again.",
    category: "bridge",
  },
  "Bridge timeout": {
    message: "Bridge transaction timed out. Please check status.",
    category: "timeout",
  },
  "Unsupported chain": {
    message: "This chain is not supported for this operation.",
    category: "chain_mismatch",
  },
  "Chain mismatch": {
    message: "Your wallet is on the wrong network. Please switch.",
    category: "chain_mismatch",
  },
  "Invalid destination": {
    message: "Invalid destination chain or address.",
    category: "bridge",
  },
  "Bridge paused": {
    message: "Bridge is paused. Please try again later.",
    category: "protocol_limit",
  },
  // LayerZero / Messaging Bridges
  "LayerZero: not enough native for fees": {
    message: "Not enough native token to pay bridge fees. Add gas and retry.",
    category: "bridge",
  },
  "LayerZero: destination chain is not a trusted remote": {
    message:
      "Destination chain is not trusted. Check the target chain and retry.",
    category: "bridge",
  },
  "LayerZero: invalid payload": {
    message:
      "Bridge payload invalid. Retry the transaction or contact support.",
    category: "bridge",
  },
  "LayerZero: message blocked. please retry on destination": {
    message: "Bridge message blocked. Retry on the destination chain.",
    category: "bridge",
  },
  "LayerZero: LzTokenUnavailable": {
    message:
      "The bridge does not have enough liquidity of this token right now.",
    category: "bridge",
  },
  // Li.Fi / Stargate Bridge Errors
  "1001": {
    message:
      "No route found. Your address might not have enough balance for any available bridge.",
    category: "bridge",
  },
  "1007": {
    message:
      "Slippage error on the bridge. The exchange rate changed during the transfer.",
    category: "bridge",
  },
  NOT_PROCESSABLE_REFUND_NEEDED: {
    message:
      "The bridge failed due to price movement. A refund has been triggered.",
    category: "bridge",
  },
  AMOUNT_TOO_LOW: {
    message: "The amount is too small to bridge. Please send more.",
    category: "bridge",
  },
  AMOUNT_TOO_HIGH: {
    message:
      "This bridge has a limit. Try a smaller amount or a different bridge.",
    category: "bridge",
  },
  "Stargate: Not enough liquidity": {
    message: "The destination chain's pool is low on funds. Try again later.",
    category: "bridge",
  },
};
