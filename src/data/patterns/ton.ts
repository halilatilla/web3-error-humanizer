import type { CategorizedPattern } from "../../types";

export const tonPatterns: Record<string, CategorizedPattern> = {
  // TON / TonConnect Errors
  USER_REJECTS_ERROR: {
    message: "You declined the request in your TON wallet.",
    category: "user_rejection",
  },
  UNKNOWN_APP_ERROR: {
    message: "Unknown app error. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  BAD_REQUEST_ERROR: {
    message: "Invalid request. Please try again.",
    category: "wallet_connection",
  },
  UNKNOWN_ERROR: {
    message: "An unknown error occurred in your TON wallet.",
    category: "wallet_connection",
  },
  METHOD_NOT_SUPPORTED: {
    message: "This method is not supported by your TON wallet.",
    category: "wallet_connection",
  },
  TON_CONNECT_ERROR: {
    message: "TON Connect error. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  "Tonkeeper - Rejected": {
    message: "You declined the request in Tonkeeper.",
    category: "user_rejection",
  },
  "Tonkeeper - Cancelled": {
    message: "You cancelled the request in Tonkeeper.",
    category: "user_rejection",
  },
  "OpenMask - Rejected": {
    message: "You declined the request in OpenMask.",
    category: "user_rejection",
  },
  "MyTonWallet - Rejected": {
    message: "You declined the request in MyTonWallet.",
    category: "user_rejection",
  },
  "TonConnect: Connection was closed": {
    message: "Wallet connection was closed. Please reconnect.",
    category: "wallet_connection",
  },
  "TonConnect: Bridge connection error": {
    message: "Connection error. Please try reconnecting your TON wallet.",
    category: "wallet_connection",
  },
  "TonConnect: Session not found": {
    message: "Session expired. Please reconnect your TON wallet.",
    category: "wallet_connection",
  },
  "Unable to verify source": {
    message: "Unable to verify wallet source. Please reconnect.",
    category: "wallet_connection",
  },
  "Wallet is not connected": {
    message: "TON wallet not connected. Please connect first.",
    category: "wallet_connection",
  },
  "Invalid BOC": {
    message: "Invalid transaction data. Please try again.",
    category: "wallet_connection",
  },
  "Not enough TON": {
    message: "Not enough TON for this transaction.",
    category: "insufficient_funds",
  },
  "Not enough balance": {
    message: "Insufficient balance for this transaction.",
    category: "insufficient_funds",
  },
  "Cell underflow": {
    message:
      "Transaction data mismatch (cellUnderflow). Please check your parameters and try again.",
    category: "wallet_connection",
  },
  "Cell overflow": {
    message:
      "Transaction data is too large (cellOverflow). Please check your parameters and try again.",
    category: "wallet_connection",
  },
  "Invalid seqno": {
    message: "Transaction sequence number is incorrect. Please try again.",
    category: "wallet_connection",
  },
  "Bounced transaction": {
    message:
      "Transaction was rejected and bounced back. Please check your transaction parameters.",
    category: "wallet_connection",
  },
  "Invalid fees": {
    message:
      "Transaction fees are insufficient. Please increase the fee amount and try again.",
    category: "wallet_connection",
  },
};
