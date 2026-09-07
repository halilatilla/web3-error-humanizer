import type { CategorizedPattern } from "../../types";

export const solanaPatterns: Record<string, CategorizedPattern> = {
  // Phantom / Solana Wallet Errors
  WalletNotConnectedError: {
    message: "Wallet not connected. Please connect your wallet first.",
    category: "wallet_connection",
  },
  WalletConnectionError: {
    message: "Failed to connect wallet. Please try again.",
    category: "wallet_connection",
  },
  WalletSendTransactionError: {
    message: "Failed to send transaction. Please try again.",
    category: "contract_error",
  },
  WalletSignTransactionError: {
    message: "You cancelled the transaction signing.",
    category: "user_rejection",
  },
  WalletSignMessageError: {
    message: "Message signing failed. Please try again.",
    category: "wallet_connection",
  },
  WalletNotReadyError: {
    message: "Wallet not ready. Please ensure it's installed and unlocked.",
    category: "wallet_connection",
  },
  WalletPublicKeyError: {
    message: "Could not get wallet address. Please reconnect.",
    category: "wallet_connection",
  },
  WalletDisconnectionError: {
    message: "Failed to disconnect wallet. Please try again.",
    category: "wallet_connection",
  },
  WalletAccountError: {
    message: "Could not access wallet account.",
    category: "wallet_connection",
  },
  WalletNotSelectedError: {
    message: "No wallet selected. Please select a wallet first.",
    category: "wallet_connection",
  },
  "Phantom - Rejected": {
    message: "You declined the request in Phantom.",
    category: "user_rejection",
  },
  "Phantom - Unauthorized": {
    message: "Phantom is not authorized. Please connect first.",
    category: "wallet_connection",
  },
  "Phantom - Disconnected": {
    message: "Phantom is disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  "Phantom wallet not found": {
    message: "Phantom wallet not detected. Please install Phantom.",
    category: "wallet_connection",
  },
  "Solflare - Rejected": {
    message: "You declined the request in Solflare.",
    category: "user_rejection",
  },
  "Backpack - Rejected": {
    message: "You declined the request in Backpack.",
    category: "user_rejection",
  },
  "Transaction simulation failed": {
    message: "Transaction simulation failed. Check your inputs.",
    category: "contract_error",
  },
  "Blockhash not found": {
    message: "Transaction expired. Please try again.",
    category: "timeout",
  },
  "Transaction was not confirmed": {
    message: "Transaction wasn't confirmed in time. It may still succeed.",
    category: "timeout",
  },
  "block height exceeded": {
    message: "Transaction expired. Please try again with fresh blockhash.",
    category: "timeout",
  },
  "Signature verification failed": {
    message: "Transaction signature verification failed.",
    category: "wallet_connection",
  },
  "Account not found": {
    message: "Wallet account not found. Please check the address.",
    category: "wallet_connection",
  },
  "Insufficient SOL": {
    message: "Not enough SOL for transaction fees.",
    category: "insufficient_funds",
  },
  "Insufficient lamports": {
    message: "Not enough SOL balance for this transaction.",
    category: "insufficient_funds",
  },
  "Program failed to complete": {
    message: "The program execution failed. Please try again.",
    category: "wallet_connection",
  },
  "custom program error": {
    message: "Smart contract returned an error. Please check your inputs.",
    category: "wallet_connection",
  },
  AccountNotFound: {
    message: "The specified account doesn't exist.",
    category: "wallet_connection",
  },
  InstructionError: {
    message: "Transaction instruction failed. Please check your inputs.",
    category: "wallet_connection",
  },
  InvalidAccountData: {
    message: "Invalid account data. Please try again.",
    category: "wallet_connection",
  },
  SendTransactionError: {
    message: "Failed to send the Solana transaction. Please try again.",
    category: "contract_error",
  },
  TransactionExpiredBlockheightExceededError: {
    message:
      "Transaction expired because block height was exceeded. Please try again.",
    category: "timeout",
  },
  TransactionExpiredTimeoutError: {
    message:
      "Transaction timed out before being confirmed. It may still succeed.",
    category: "timeout",
  },
  GenericError: {
    message: "A generic error occurred. Please try again.",
    category: "wallet_connection",
  },
  InvalidArgument: {
    message: "Invalid argument passed to the program.",
    category: "wallet_connection",
  },
  InvalidInstructionData: {
    message: "The instruction data is invalid.",
    category: "wallet_connection",
  },
  AccountDataTooSmall: {
    message: "The account data is too small for this operation.",
    category: "wallet_connection",
  },
  InsufficientFunds: {
    message: "Insufficient funds to complete this transaction.",
    category: "insufficient_funds",
  },
  IncorrectProgramId: {
    message: "The program ID does not match the expected program.",
    category: "wallet_connection",
  },
  MissingRequiredSignature: {
    message: "A required signature is missing from the transaction.",
    category: "signature",
  },
  AccountAlreadyInitialized: {
    message: "This account has already been initialized.",
    category: "wallet_connection",
  },
  UninitializedAccount: {
    message: "The account has not been initialized yet.",
    category: "wallet_connection",
  },
  AccountBorrowFailed: {
    message: "Failed to borrow the account data. Try again.",
    category: "wallet_connection",
  },
  MaxSeedLengthExceeded: {
    message: "The seed length exceeds the maximum allowed.",
    category: "wallet_connection",
  },
  InvalidSeeds: {
    message: "The provided seeds are invalid for this program address.",
    category: "wallet_connection",
  },
  AccountNotRentExempt: {
    message: "The account does not have enough SOL to be rent-exempt.",
    category: "insufficient_funds",
  },
  MaxAccountsDataAllocationsExceeded: {
    message: "Maximum account data allocation exceeded.",
    category: "wallet_connection",
  },
  MaxAccountsExceeded: {
    message:
      "Too many accounts in this transaction. Try splitting into smaller transactions.",
    category: "wallet_connection",
  },
  // Solana / Jupiter Aggregator Errors
  "0x1771": {
    message:
      "Price moved beyond your slippage limit on Solana. Try increasing it.",
    category: "slippage",
  },
  "0x1788": {
    message: "Jupiter route calculation error. Try refreshing the quote.",
    category: "slippage",
  },
  "0x1": {
    message:
      "Solana program error. Usually indicates insufficient funds or invalid instruction.",
    category: "slippage",
  },
  "0x1770": {
    message:
      "The liquidity pool has changed. Refresh the page for a new quote.",
    category: "slippage",
  },
  "Slippage tolerance exceeded": {
    message: "Price changed too fast. Increase your slippage tolerance.",
    category: "slippage",
  },
  "Compute budget exceeded": {
    message: "The transaction is too complex for Solana. Try a simpler route.",
    category: "gas",
  },
  BlockhashNotFound: {
    message: "Transaction expired. Solana network is busy, please try again.",
    category: "timeout",
  },
};
