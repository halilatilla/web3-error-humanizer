import type { CategorizedPattern } from "../../types";

export const suiPatterns: Record<string, CategorizedPattern> = {
  // Sui Wallet Errors
  "WALLET.CONNECT_ERROR": {
    message: "Failed to connect to Sui wallet. Please try again.",
    category: "wallet_connection",
  },
  "WALLET.DISCONNECT_ERROR": {
    message: "Failed to disconnect from Sui wallet.",
    category: "wallet_connection",
  },
  "WALLET.SIGN_TX_ERROR": {
    message: "Transaction signing failed or was rejected.",
    category: "wallet_connection",
  },
  "WALLET.SIGN_MSG_ERROR": {
    message: "Message signing failed. Please try again.",
    category: "wallet_connection",
  },
  "WALLET.LISTEN_TO_EVENT_ERROR": {
    message: "Failed to listen to wallet events.",
    category: "wallet_connection",
  },
  "WALLET.METHOD_NOT_IMPLEMENTED_ERROR": {
    message: "This method is not supported by your wallet.",
    category: "wallet_connection",
  },
  "WALLET.CONNECT_ERROR__USER_REJECTED": {
    message: "You declined to connect your Sui wallet.",
    category: "user_rejection",
  },
  "Sui Wallet - Rejected": {
    message: "You declined the request in Sui Wallet.",
    category: "user_rejection",
  },
  "Suiet - Rejected": {
    message: "You declined the request in Suiet wallet.",
    category: "user_rejection",
  },
  "Ethos - Rejected": {
    message: "You declined the request in Ethos wallet.",
    category: "user_rejection",
  },
  "Martian Sui - Rejected": {
    message: "You declined the request in Martian Sui wallet.",
    category: "user_rejection",
  },
  "Insufficient gas": {
    message: "Not enough SUI for gas fees.",
    category: "gas",
  },
  InsufficientGas: {
    message: "Not enough SUI to pay for transaction fees.",
    category: "gas",
  },
  InsufficientCoinBalance: {
    message: "Insufficient coin balance for this transaction.",
    category: "insufficient_funds",
  },
  ObjectNotFound: {
    message: "The specified object was not found on chain.",
    category: "wallet_connection",
  },
  InvalidTxSignature: {
    message: "Invalid transaction signature.",
    category: "wallet_connection",
  },
  MoveAbort: {
    message: "Smart contract execution failed.",
    category: "wallet_connection",
  },
  PackageNotFound: {
    message: "Package not found. Please check the address.",
    category: "wallet_connection",
  },
  DynamicFieldNotFound: {
    message: "Dynamic field not found.",
    category: "wallet_connection",
  },
  InvalidPublicKey: {
    message: "Invalid public key provided.",
    category: "wallet_connection",
  },
  ModuleNotFound: {
    message: "Contract module not found. Please verify the contract details.",
    category: "wallet_connection",
  },
  FunctionNotFound: {
    message:
      "The requested contract function is not found. Please check your transaction parameters.",
    category: "wallet_connection",
  },
  GasComputationError: {
    message:
      "Unable to calculate gas fees. Please try again or contact support.",
    category: "wallet_connection",
  },
  ConsensusError: {
    message:
      "Network consensus validation failed. Please try again in a moment.",
    category: "wallet_connection",
  },
  InvalidObjectOwner: {
    message: "Invalid object owner. Please check your transaction parameters.",
    category: "wallet_connection",
  },
  ObjectVersionNotFound: {
    message:
      "Object version not found. Please check your transaction parameters.",
    category: "wallet_connection",
  },
  InvalidObjectType: {
    message: "Invalid object type. Please check your transaction parameters.",
    category: "wallet_connection",
  },
  InvalidObjectId: {
    message: "Invalid object ID. Please check your transaction parameters.",
    category: "wallet_connection",
  },
};
