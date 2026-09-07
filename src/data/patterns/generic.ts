import type { CategorizedPattern } from "../../types";

export const genericPatterns: Record<string, CategorizedPattern> = {
  // User Actions / Wallet Rejections (Generic)
  ACTION_REJECTED: {
    message: "The transaction was cancelled in your wallet.",
    category: "user_rejection",
  },
  USER_REJECTED: {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "User rejected": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "User denied": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "user rejected transaction": {
    message: "You cancelled the transaction in your wallet.",
    category: "user_rejection",
  },
  "user rejected signing": {
    message: "You cancelled the signing request.",
    category: "user_rejection",
  },
  "Request rejected": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "User cancelled": {
    message: "You cancelled the transaction.",
    category: "user_rejection",
  },
  "User closed": {
    message: "You closed the wallet popup without completing the action.",
    category: "user_rejection",
  },
  "Rejected by user": {
    message: "You declined the request.",
    category: "user_rejection",
  },
  "User disapproved": {
    message: "You declined the request.",
    category: "user_rejection",
  },
  // Insufficient Funds / Balance Errors
  INSUFFICIENT_FUNDS: {
    message:
      "You don't have enough gas (ETH/native token) to pay for this transaction.",
    category: "insufficient_funds",
  },
  "insufficient funds": {
    message: "You don't have enough balance for this transaction.",
    category: "insufficient_funds",
  },
  "insufficient balance": {
    message: "Your token balance is too low for this swap.",
    category: "insufficient_funds",
  },
  "exceeds balance": {
    message: "The amount exceeds your available balance.",
    category: "insufficient_funds",
  },
  "transfer amount exceeds balance": {
    message: "You're trying to send more tokens than you have.",
    category: "insufficient_funds",
  },
  "burn amount exceeds balance": {
    message: "You're trying to burn more tokens than you have.",
    category: "insufficient_funds",
  },
  InsufficientBalance: {
    message: "Your balance is too low for this transaction.",
    category: "insufficient_funds",
  },
  // Allowance / Approval Errors
  "insufficient allowance": {
    message: "You need to approve the token first before swapping.",
    category: "insufficient_allowance",
  },
  "allowance exceeded": {
    message: "Token approval needed. Please approve the token first.",
    category: "insufficient_allowance",
  },
  "ERC20: insufficient allowance": {
    message: "Please approve the token before swapping.",
    category: "insufficient_allowance",
  },
  "SafeERC20: low-level call failed": {
    message:
      "Token transfer failed. The token may require approval or has transfer restrictions.",
    category: "insufficient_allowance",
  },
  TRANSFER_FROM_FAILED: {
    message:
      "Token approval failed or you have insufficient balance of the token you are selling.",
    category: "insufficient_allowance",
  },
  STF: {
    message: "Token transfer failed. Make sure you have approved the token.",
    category: "insufficient_allowance",
  },
  "TransferHelper: TRANSFER_FROM_FAILED": {
    message:
      "Token transfer failed. Please approve the token or check your balance.",
    category: "insufficient_allowance",
  },
  "TransferHelper::transferFrom: transferFrom failed": {
    message: "Token transfer failed. Please approve or check balance.",
    category: "insufficient_allowance",
  },
  // Slippage / Price Impact Errors
  INSUFFICIENT_OUTPUT_AMOUNT: {
    message: "Price moved too much. Try increasing your slippage tolerance.",
    category: "slippage",
  },
  INSUFFICIENT_INPUT_AMOUNT: {
    message: "Input amount too small for this swap. Try a larger amount.",
    category: "slippage",
  },
  EXCESSIVE_INPUT_AMOUNT: {
    message: "Price moved unfavorably. Try increasing your slippage tolerance.",
    category: "slippage",
  },
  "Too little received": {
    message: "Price changed too much. Increase your slippage tolerance.",
    category: "slippage",
  },
  "Too much requested": {
    message: "Price changed unfavorably. Try increasing slippage.",
    category: "slippage",
  },
  "Price slippage check": {
    message: "Price moved beyond your slippage tolerance. Try increasing it.",
    category: "slippage",
  },
  SlippageToleranceExceeded: {
    message: "Price moved too much. Increase your slippage tolerance.",
    category: "slippage",
  },
  INSUFFICIENT_LIQUIDITY: {
    message: "Not enough liquidity for this trade. Try a smaller amount.",
    category: "slippage",
  },
  InsufficientLiquidity: {
    message: "Not enough liquidity. Try a smaller amount or different pair.",
    category: "slippage",
  },
  // Gas Related Errors
  "gas required exceeds allowance": {
    message: "Gas limit too low. Try increasing the gas limit.",
    category: "gas",
  },
  "intrinsic gas too low": {
    message: "Gas limit is too low for this transaction. Increase gas limit.",
    category: "gas",
  },
  "out of gas": {
    message: "Transaction ran out of gas. Try increasing the gas limit.",
    category: "gas",
  },
  "exceeds block gas limit": {
    message: "Transaction too large. Try splitting into smaller transactions.",
    category: "gas",
  },
  "max fee per gas less than block base fee": {
    message: "Gas price too low. Increase your gas fee.",
    category: "gas",
  },
  "replacement transaction underpriced": {
    message:
      "Gas price too low to replace pending transaction. Increase gas fee.",
    category: "gas",
  },
  REPLACEMENT_UNDERPRICED: {
    message: "Gas price too low to speed up transaction. Increase gas fee.",
    category: "gas",
  },
  "max priority fee per gas higher than max fee per gas": {
    message: "Invalid gas settings. Priority fee cannot exceed max fee.",
    category: "gas",
  },
  "transaction underpriced": {
    message: "Gas price too low. Increase your gas fee and try again.",
    category: "gas",
  },
  UNPREDICTABLE_GAS_LIMIT: {
    message:
      "The network could not estimate fees. The transaction may fail — check the amount or raise the fee and try again.",
    category: "gas",
  },
  FeeCapTooLowError: {
    message:
      "Your max fee is too low for the current network. Raise the fee and try again.",
    category: "gas",
  },
  InsufficientFundsError: {
    message:
      "Your wallet doesn't have enough funds to cover this transaction. Add funds and try again.",
    category: "insufficient_funds",
  },
  // Nonce Errors
  NONCE_EXPIRED: {
    message: "Transaction outdated. Please refresh and try again.",
    category: "nonce",
  },
  "nonce too low": {
    message:
      "You have a pending transaction. Wait for it to complete or speed it up.",
    category: "nonce",
  },
  NonceTooLowError: {
    message:
      "You have a pending transaction. Wait for it to complete or speed it up.",
    category: "nonce",
  },
  "nonce too high": {
    message:
      "Transaction sequence error. Try resetting your wallet's transaction history.",
    category: "nonce",
  },
  "already known": {
    message:
      "This transaction is already pending. Please wait for it to complete.",
    category: "nonce",
  },
  "replacement fee too low": {
    message: "Fee too low to replace pending transaction. Increase gas fee.",
    category: "nonce",
  },
  // Transaction Errors
  TRANSACTION_REPLACED: {
    message: "Your transaction was replaced by another one.",
    category: "contract_error",
  },
  EXPIRED: {
    message:
      "The swap took too long to confirm. Please try again with a higher gas fee.",
    category: "timeout",
  },
  "transaction failed": {
    message: "The transaction failed. Please try again.",
    category: "contract_error",
  },
  "execution reverted": {
    message: "Transaction was rejected by the network. Check your inputs.",
    category: "contract_error",
  },
  reverted: {
    message: "Transaction failed. Please check your inputs and try again.",
    category: "contract_error",
  },
  revert: {
    message: "Transaction failed. Please check your inputs and try again.",
    category: "contract_error",
  },
  CALL_EXCEPTION: {
    message: "The contract call failed. Please try again.",
    category: "contract_error",
  },
  "invalid opcode": {
    message: "Smart contract error. Please try again or contact support.",
    category: "contract_error",
  },
  "stack too deep": {
    message: "Smart contract error. Please try again.",
    category: "contract_error",
  },
  NOT_IMPLEMENTED: {
    message: "This feature is not implemented yet.",
    category: "contract_error",
  },
  UNSUPPORTED_OPERATION: {
    message: "This operation is not supported.",
    category: "contract_error",
  },
  SERVER_ERROR: {
    message: "Server error occurred. Please try again.",
    category: "contract_error",
  },
  BAD_DATA: {
    message: "Invalid data provided. Please check your inputs.",
    category: "contract_error",
  },
  CANCELLED: {
    message: "The operation was cancelled.",
    category: "user_rejection",
  },
  BUFFER_OVERRUN: {
    message: "Buffer overflow error. Please try again.",
    category: "contract_error",
  },
  NUMERIC_FAULT: {
    message: "Numeric calculation error. Please check your values.",
    category: "contract_error",
  },
  INVALID_ARGUMENT: {
    message: "Invalid argument provided. Please check your inputs.",
    category: "contract_error",
  },
  MISSING_ARGUMENT: {
    message:
      "Required argument is missing. Please provide all required parameters.",
    category: "contract_error",
  },
  UNEXPECTED_ARGUMENT: {
    message: "Unexpected argument provided. Please check your inputs.",
    category: "contract_error",
  },
  VALUE_MISMATCH: {
    message: "Value mismatch error. Please check your inputs.",
    category: "contract_error",
  },
  UNCONFIGURED_NAME: {
    message: "Name not configured. Please check your configuration.",
    category: "contract_error",
  },
  OFFCHAIN_FAULT: {
    message: "Off-chain error occurred. Please try again.",
    category: "contract_error",
  },
  // Network / Connection Errors
  NETWORK_ERROR: {
    message:
      "Network connection issue. Please check your internet and try again.",
    category: "network",
  },
  "network changed": {
    message: "Network changed. Please reconnect your wallet.",
    category: "chain_mismatch",
  },
  TIMEOUT: {
    message: "Request timed out. Please check your connection and try again.",
    category: "timeout",
  },
  "Failed to fetch": {
    message: "Network error. Please check your internet connection.",
    category: "network",
  },
  NetworkError: {
    message: "Connection failed. Check your internet and try again.",
    category: "network",
  },
  "could not detect network": {
    message: "Unable to connect to the network. Please try again.",
    category: "network",
  },
  "missing response": {
    message: "No response from the network. Please try again.",
    category: "network",
  },
  "connection refused": {
    message: "Could not connect to the network. Try again later.",
    category: "network",
  },
  ETIMEDOUT: {
    message: "Connection timed out. Please try again.",
    category: "timeout",
  },
  ECONNREFUSED: {
    message: "Connection refused. Please try again later.",
    category: "network",
  },
  "network does not support": {
    message: "This feature is not supported on this network.",
    category: "chain_mismatch",
  },
  // RPC Errors (EIP-1193 & EIP-1474)
  "-32700": {
    message: "Invalid request format (Parse Error). Please try again.",
    category: "network",
  },
  "-32600": {
    message: "Invalid request. Please try again.",
    category: "network",
  },
  "-32601": {
    message: "Method not supported by your wallet.",
    category: "network",
  },
  "-32602": {
    message: "Invalid parameters. Please check your inputs.",
    category: "network",
  },
  "-32603": {
    message: "Internal JSON-RPC error. Please try again.",
    category: "network",
  },
  "-32000": {
    message: "Server error. Please try again.",
    category: "network",
  },
  "-32001": {
    message: "Resource not found. Please try again.",
    category: "network",
  },
  "-32002": {
    message: "Request already pending. Please wait.",
    category: "network",
  },
  "-32003": {
    message: "Transaction rejected by the network.",
    category: "network",
  },
  "-32004": {
    message: "Method not supported.",
    category: "network",
  },
  "-32005": {
    message: "Request limit exceeded. Please wait and try again.",
    category: "network",
  },
  "-32006": {
    message: "Request limit exceeded. Please wait and try again.",
    category: "network",
  },
  "4001": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "4100": {
    message: "Wallet is locked or the requested method is not authorized.",
    category: "wallet_connection",
  },
  "4200": {
    message: "This method is not supported by your wallet.",
    category: "network",
  },
  "4900": {
    message: "Wallet is disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  "4901": {
    message:
      "Wallet is connected to a different network. Please switch networks.",
    category: "chain_mismatch",
  },
  "4902": {
    message: "This network isn't in your wallet yet. Add it, then try again.",
    category: "chain_mismatch",
  },
  "5000": {
    message: "User rejected the request.",
    category: "user_rejection",
  },
  "5001": {
    message: "Chain ID does not match.",
    category: "chain_mismatch",
  },
  // Aptos Wallet Errors
  "Petra - Rejected": {
    message: "You declined the request in Petra wallet.",
    category: "user_rejection",
  },
  "Pontem - Rejected": {
    message: "You declined the request in Pontem wallet.",
    category: "user_rejection",
  },
  "Martian - Rejected": {
    message: "You declined the request in Martian wallet.",
    category: "user_rejection",
  },
  "Rise - Rejected": {
    message: "You declined the request in Rise wallet.",
    category: "user_rejection",
  },
  "Fewcha - Rejected": {
    message: "You declined the request in Fewcha wallet.",
    category: "user_rejection",
  },
  AptosWalletError: {
    message: "Aptos wallet encountered an error. Please try again.",
    category: "wallet_connection",
  },
  INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE: {
    message: "Not enough APT for gas fees.",
    category: "insufficient_funds",
  },
  SEQUENCE_NUMBER_TOO_OLD: {
    message: "Transaction sequence error. Please try again.",
    category: "nonce",
  },
  SEQUENCE_NUMBER_TOO_NEW: {
    message: "Transaction sequence too new. Please wait.",
    category: "nonce",
  },
  TRANSACTION_EXPIRED: {
    message: "Transaction expired. Please try again.",
    category: "timeout",
  },
  INVALID_AUTH_KEY: {
    message: "Invalid authentication key.",
    category: "wallet_connection",
  },
  EPENDING_TRANSACTION_EXISTS: {
    message: "A pending transaction exists. Please wait.",
    category: "wallet_connection",
  },
  MAX_GAS_UNITS_BELOW_MIN_TRANSACTION_GAS_UNITS: {
    message: "Gas limit too low.",
    category: "wallet_connection",
  },
  MAX_GAS_UNITS_EXCEEDS_MAX_GAS_UNITS_BOUND: {
    message: "Gas limit too high.",
    category: "wallet_connection",
  },
  GAS_UNIT_PRICE_BELOW_MIN_BOUND: {
    message: "Gas price too low.",
    category: "wallet_connection",
  },
  GAS_UNIT_PRICE_ABOVE_MAX_BOUND: {
    message: "Gas price too high.",
    category: "wallet_connection",
  },
  MOVE_ABORT: {
    message: "Smart contract execution aborted.",
    category: "wallet_connection",
  },
  EXECUTION_LIMIT_REACHED: {
    message: "Execution limit reached. Please try again.",
    category: "wallet_connection",
  },
  OUT_OF_GAS: {
    message: "Transaction ran out of gas. Increase gas limit.",
    category: "gas",
  },
  INVALID_SIGNATURE: {
    message: "Invalid transaction signature.",
    category: "wallet_connection",
  },
  INVALID_TRANSACTION_PAYLOAD: {
    message: "Invalid transaction data.",
    category: "wallet_connection",
  },
  // Token Specific Errors
  "ERC20: transfer to the zero address": {
    message: "Invalid recipient address. Please check the address.",
    category: "contract_error",
  },
  "ERC20: approve to the zero address": {
    message: "Invalid approval address. Please check the address.",
    category: "contract_error",
  },
  "ERC20: transfer from the zero address": {
    message: "Invalid sender address.",
    category: "contract_error",
  },
  "ERC20: mint to the zero address": {
    message: "Invalid minting address.",
    category: "contract_error",
  },
  "ERC20: burn from the zero address": {
    message: "Invalid burn address.",
    category: "contract_error",
  },
  "ERC20: decreased allowance below zero": {
    message: "Cannot decrease allowance below zero.",
    category: "contract_error",
  },
  "Pausable: paused": {
    message: "This token is currently paused. Please try later.",
    category: "protocol_limit",
  },
  "Ownable: caller is not the owner": {
    message: "You don't have permission for this action.",
    category: "contract_error",
  },
  AccessControl: {
    message: "You don't have the required permissions for this action.",
    category: "contract_error",
  },
  Blacklisted: {
    message: "This address has been restricted from trading.",
    category: "contract_error",
  },
  "Trading not enabled": {
    message: "Trading is not yet enabled for this token.",
    category: "protocol_limit",
  },
  "Max transaction": {
    message: "Amount exceeds maximum transaction limit.",
    category: "contract_error",
  },
  "Max wallet": {
    message: "This would exceed the maximum wallet holding limit.",
    category: "contract_error",
  },
  "Buy limit": {
    message: "This exceeds the buy limit for this token.",
    category: "contract_error",
  },
  "Sell limit": {
    message: "This exceeds the sell limit for this token.",
    category: "contract_error",
  },
  Cooldown: {
    message: "Please wait before making another transaction.",
    category: "protocol_limit",
  },
  "Anti-bot": {
    message: "Transaction blocked by anti-bot protection. Try again shortly.",
    category: "protocol_limit",
  },
  "Tax too high": {
    message: "Token tax is too high for this trade.",
    category: "contract_error",
  },
  // Contract Interaction Errors
  "contract not deployed": {
    message: "Smart contract not found on this network. Check the network.",
    category: "contract_error",
  },
  "invalid address": {
    message: "Invalid address provided. Please check and try again.",
    category: "contract_error",
  },
  "invalid signature": {
    message: "Invalid signature. Please try signing again.",
    category: "contract_error",
  },
  "signature expired": {
    message: "Signature expired. Please sign again.",
    category: "contract_error",
  },
  deadline: {
    message: "Transaction deadline passed. Please try again.",
    category: "timeout",
  },
  "Deadline expired": {
    message: "Quote expired. Please refresh and try again.",
    category: "timeout",
  },
  "Already initialized": {
    message: "This contract is already set up.",
    category: "contract_error",
  },
  "Not initialized": {
    message: "Contract not ready. Please try again later.",
    category: "contract_error",
  },
  // Permit / Signature Errors
  "invalid permit": {
    message: "Permit signature is invalid. Please try approving again.",
    category: "signature",
  },
  "permit expired": {
    message: "Permit expired. Please sign a new approval.",
    category: "signature",
  },
  INVALID_SIGNER: {
    message: "Invalid signature. Please try signing again.",
    category: "signature",
  },
  EXPIRED_PERMIT: {
    message: "Your permit has expired. Please sign again.",
    category: "signature",
  },
  // MEV / Sandwich Attack Protection
  frontrun: {
    message: "Transaction may have been front-run. Try using MEV protection.",
    category: "slippage",
  },
  sandwich: {
    message:
      "Potential sandwich attack detected. Consider using MEV protection.",
    category: "slippage",
  },
  MEV: {
    message: "MEV protection triggered. Try using a private RPC.",
    category: "slippage",
  },
  // Miscellaneous / Generic Errors
  "Header not found": {
    message: "Block not found. Please try again.",
    category: "network",
  },
  "Unknown block": {
    message: "Block not found. The network may be syncing.",
    category: "network",
  },
  "pruned data": {
    message: "Historical data not available. Try a different RPC.",
    category: "network",
  },
  "rate limit": {
    message: "Too many requests. Please wait a moment and try again.",
    category: "network",
  },
  "Too Many Requests": {
    message: "Rate limited. Please wait and try again.",
    category: "network",
  },
  exceeded: {
    message: "Limit exceeded. Please try again later.",
    category: "network",
  },
  Forbidden: {
    message: "Access denied. Please check your permissions.",
    category: "network",
  },
  Unauthorized: {
    message: "Not authorized. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  // Keplr / Cosmos Wallet Errors
  "Keplr - Rejected": {
    message: "You declined the request in Keplr.",
    category: "user_rejection",
  },
  "Request rejected by user": {
    message: "You declined the request.",
    category: "user_rejection",
  },
  "Failed to retrieve account": {
    message: "Could not get account from Keplr. Please reconnect.",
    category: "user_rejection",
  },
  "Key not found": {
    message: "Account not found. Please add this chain to Keplr.",
    category: "user_rejection",
  },
  // Common DeFi Protocol Errors (Generic)
  OwnableUnauthorizedAccount: {
    message: "You are not the owner of this contract.",
    category: "contract_error",
  },
  OwnableInvalidOwner: {
    message: "Invalid owner address provided.",
    category: "contract_error",
  },
  EnforcedPause: {
    message: "This contract is currently paused.",
    category: "protocol_limit",
  },
  ExpectedPause: {
    message: "This contract is expected to be paused but is not.",
    category: "contract_error",
  },
  ReentrancyGuardReentrantCall: {
    message: "Re-entrant call detected and blocked for security.",
    category: "contract_error",
  },
  AccessControlUnauthorizedAccount: {
    message: "You do not have the required role to perform this action.",
    category: "contract_error",
  },
  AccessControlBadConfirmation: {
    message: "Role renunciation confirmation does not match.",
    category: "contract_error",
  },
  SafeERC20FailedOperation: {
    message: "Token operation failed. Check approval and balance.",
    category: "contract_error",
  },
  FailedCall: {
    message: "External call failed. Please try again.",
    category: "contract_error",
  },
  AddressEmptyCode: {
    message: "The target address has no contract code deployed.",
    category: "contract_error",
  },
  AddressInsufficientBalance: {
    message: "The contract does not have enough balance to send.",
    category: "contract_error",
  },
  MathOverflowedMulDiv: {
    message: "Math overflow in multiplication/division.",
    category: "contract_error",
  },
  CheckpointUnorderedInsertion: {
    message: "Checkpoint insertion is not in chronological order.",
    category: "contract_error",
  },
  "execution reverted: ERC20: transfer amount exceeds balance": {
    message: "You're trying to transfer more tokens than you have.",
    category: "insufficient_funds",
  },
  "execution reverted: ERC20: transfer amount exceeds allowance": {
    message: "Token approval needed. Please approve the token first.",
    category: "insufficient_allowance",
  },
  "execution reverted: ERC721: transfer caller is not owner nor approved": {
    message: "You don't own this NFT or haven't approved the transfer.",
    category: "contract_error",
  },
  "execution reverted: Ownable: caller is not the owner": {
    message: "Only the contract owner can perform this action.",
    category: "contract_error",
  },
};
