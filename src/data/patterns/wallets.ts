import type { CategorizedPattern } from "../../types";

export const walletPatterns: Record<string, CategorizedPattern> = {
  // WalletConnect v2 Error Codes
  invalidMethod: {
    message: "Invalid method requested via WalletConnect.",
    category: "wallet_connection",
  },
  invalidEvent: {
    message: "Invalid event sent via WalletConnect.",
    category: "wallet_connection",
  },
  "3001": {
    message: "Unauthorized method. Your wallet doesn't support this action.",
    category: "wallet_connection",
  },
  "3002": {
    message: "Unauthorized event. Your wallet rejected this notification.",
    category: "wallet_connection",
  },
  "3005": {
    message:
      "Unauthorized chain. Your wallet doesn't support this network via WalletConnect.",
    category: "wallet_connection",
  },
  "5100": {
    message: "The requested chain is not supported by this wallet.",
    category: "wallet_connection",
  },
  "5101": {
    message: "The requested method is not supported by this wallet.",
    category: "wallet_connection",
  },
  "5102": {
    message: "The requested event is not supported by this wallet.",
    category: "wallet_connection",
  },
  "5103": {
    message: "The requested account is not supported by this wallet.",
    category: "wallet_connection",
  },
  "6000": {
    message: "Wallet disconnected by user.",
    category: "user_rejection",
  },
  "7000": {
    message: "WalletConnect session setup failed. Please try again.",
    category: "wallet_connection",
  },
  "7001": {
    message: "No active session found. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  "8000": {
    message: "WalletConnect session request expired. Please try again.",
    category: "wallet_connection",
  },
  // Viem-specific errors
  InternalRpcError: {
    message: "Internal RPC error. Please try again.",
    category: "network",
  },
  HttpRequestError: {
    message: "HTTP request failed. Please check your connection.",
    category: "network",
  },
  InvalidInputError: {
    message: "Invalid input provided. Please check your parameters.",
    category: "network",
  },
  TransactionNotFoundError: {
    message: "Transaction not found. Please check the transaction hash.",
    category: "network",
  },
  BlockNotFoundError: {
    message: "Block not found. Please check the block number or hash.",
    category: "network",
  },
  LogNotFoundError: {
    message: "Log not found. Please check your query parameters.",
    category: "network",
  },
  UserRejectedRequestError: {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  InvalidParamsRpcError: {
    message: "Invalid parameters were sent to the network. Please try again.",
    category: "network",
  },
  MethodNotFoundRpcError: {
    message: "This method is not supported by your current provider.",
    category: "network",
  },
  ResourceNotFoundRpcError: {
    message: "The requested resource was not found on the network.",
    category: "network",
  },
  ChainDisconnectedError: {
    message: "The chain disconnected. Please check your network connection.",
    category: "chain_mismatch",
  },
  ProviderDisconnectedError: {
    message: "Your wallet provider disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  SwitchChainError: {
    message:
      "Failed to switch networks. Please switch manually in your wallet.",
    category: "chain_mismatch",
  },
  UnauthorizedProviderError: {
    message: "Your wallet is not authorized. Please connect your wallet first.",
    category: "wallet_connection",
  },
  ContractFunctionExecutionError: {
    message:
      "The contract call failed. Please check your inputs and try again.",
    category: "contract_error",
  },
  ContractFunctionRevertedError: {
    message:
      "The contract rejected this transaction. Check your inputs or try a different amount.",
    category: "contract_error",
  },
  ContractFunctionZeroDataError: {
    message:
      "The contract returned no data. The function may not exist at this address.",
    category: "contract_error",
  },
  EstimateGasExecutionError: {
    message:
      "Gas estimation failed. The transaction may fail or your inputs may be invalid.",
    category: "gas",
  },
  TransactionExecutionError: {
    message:
      "Transaction failed to execute. Please check your inputs and try again.",
    category: "contract_error",
  },
  WaitForTransactionReceiptTimeoutError: {
    message:
      "Timed out waiting for confirmation. Your transaction may still be pending.",
    category: "timeout",
  },
  RpcError: {
    message: "A network request failed. Please try again.",
    category: "network",
  },
  InvalidInputRpcError: {
    message: "Invalid input sent to the network. Please check your parameters.",
    category: "network",
  },
  TransactionRejectedRpcError: {
    message: "The network rejected your transaction. Please check your inputs.",
    category: "network",
  },
  LimitExceededRpcError: {
    message: "Rate limit exceeded. Please wait a moment and try again.",
    category: "network",
  },
  ParseRpcError: {
    message: "Failed to parse the network response. Please try again.",
    category: "network",
  },
  // WalletConnect / Reown Errors
  "Session expired": {
    message: "Your session expired. Please reconnect your wallet.",
    category: "timeout",
  },
  "Session disconnected": {
    message: "Wallet disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  "WalletConnect: User rejected": {
    message: "You declined the request in your wallet.",
    category: "user_rejection",
  },
  "No matching key": {
    message: "Session not found. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  "Pairing expired": {
    message: "Connection expired. Please scan the QR code again.",
    category: "timeout",
  },
  "Topic is not a pairing topic": {
    message: "Invalid wallet connection. Please reconnect.",
    category: "wallet_connection",
  },
  "Missing or invalid": {
    message: "Connection error. Please try reconnecting.",
    category: "wallet_connection",
  },
  "Relay connection failed": {
    message: "Connection to wallet relay failed. Try again.",
    category: "wallet_connection",
  },
  // MetaMask Specific Errors
  "MetaMask Tx Signature": {
    message: "MetaMask encountered an issue signing the transaction.",
    category: "signature",
  },
  "MetaMask Message Signature": {
    message: "MetaMask couldn't sign the message. Please try again.",
    category: "signature",
  },
  "MetaMask Personal Message Signature": {
    message: "MetaMask personal sign failed. Please try again.",
    category: "signature",
  },
  "MetaMask Typed Message Signature": {
    message: "MetaMask typed data signing failed. Please try again.",
    category: "signature",
  },
  "MetaMask Chain": {
    message: "Please switch networks in MetaMask to continue.",
    category: "chain_mismatch",
  },
  "MetaMask RPC Error": {
    message: "MetaMask encountered an RPC error. Please try again.",
    category: "wallet_connection",
  },
  "User denied account authorization": {
    message: "You declined to connect your MetaMask account.",
    category: "user_rejection",
  },
  "Already processing eth_requestAccounts": {
    message: "MetaMask is already processing a connection request.",
    category: "wallet_connection",
  },
  "Request of type 'wallet_requestPermissions' already pending": {
    message: "A permission request is already pending in MetaMask.",
    category: "wallet_connection",
  },
  "eth_accounts not supported": {
    message: "Please unlock MetaMask and try again.",
    category: "wallet_connection",
  },
  // Reown AppKit Error Codes
  APKT001: {
    message: "Network not recognized. Please check your network configuration.",
    category: "wallet_connection",
  },
  APKT002: {
    message: "Domain not allowed. Please verify your domain settings.",
    category: "wallet_connection",
  },
  APKT003: {
    message: "Wallet failed to load. Check your connection and try again.",
    category: "wallet_connection",
  },
  APKT004: {
    message: "Wallet timed out. Please try again.",
    category: "wallet_connection",
  },
  APKT005: {
    message: "Domain not verified. Please verify your domain.",
    category: "wallet_connection",
  },
  APKT006: {
    message: "Session expired. Please reconnect your wallet.",
    category: "wallet_connection",
  },
  APKT007: {
    message: "Invalid project configuration. Please check your setup.",
    category: "wallet_connection",
  },
  APKT008: {
    message: "Project ID missing. Please configure your project ID.",
    category: "wallet_connection",
  },
  APKT009: {
    message: "Server error. Please try again later.",
    category: "wallet_connection",
  },
  APKT010: {
    message: "Rate limited. Please wait a moment and try again.",
    category: "wallet_connection",
  },
  // Ledger / Hardware Wallet Errors
  "Ledger device": {
    message: "Please connect and unlock your Ledger device.",
    category: "wallet_connection",
  },
  "Ledger locked": {
    message: "Your Ledger is locked. Please unlock it.",
    category: "wallet_connection",
  },
  TransportOpenUserCancelled: {
    message: "Ledger connection was cancelled.",
    category: "user_rejection",
  },
  TransportInterfaceNotAvailable: {
    message: "Ledger not accessible. Try reconnecting.",
    category: "wallet_connection",
  },
  DisconnectedDevice: {
    message: "Ledger disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  DisconnectedDeviceDuringOperation: {
    message:
      "Ledger disconnected during operation. Please reconnect and retry.",
    category: "wallet_connection",
  },
  "Denied by user on Ledger": {
    message: "You rejected the request on your Ledger device.",
    category: "user_rejection",
  },
  "Open app": {
    message: "Please open the correct app on your Ledger.",
    category: "wallet_connection",
  },
  "App does not seem to be open": {
    message: "Please open the right app on your Ledger.",
    category: "wallet_connection",
  },
  "Device is busy": {
    message: "Ledger is busy. Please wait and try again.",
    category: "wallet_connection",
  },
  "Invalid channel": {
    message: "Invalid Ledger connection. Please reconnect.",
    category: "wallet_connection",
  },
  "Trezor: Action cancelled": {
    message: "You cancelled the action on your Trezor.",
    category: "user_rejection",
  },
  "Trezor: PIN cancelled": {
    message: "PIN entry was cancelled on Trezor.",
    category: "user_rejection",
  },
  "Trezor: Passphrase cancelled": {
    message: "Passphrase entry was cancelled on Trezor.",
    category: "user_rejection",
  },
  "Device call in progress": {
    message: "Hardware wallet is processing. Please wait.",
    category: "wallet_connection",
  },
  // Coinbase Wallet Errors
  "Coinbase Wallet - Rejected": {
    message: "You declined the request in Coinbase Wallet.",
    category: "user_rejection",
  },
  "User denied request signature": {
    message: "You declined the signature request.",
    category: "user_rejection",
  },
  "QR Code Modal closed": {
    message: "QR code scanning was cancelled.",
    category: "user_rejection",
  },
  // Trust Wallet Errors
  "Trust Wallet - Rejected": {
    message: "You declined the request in Trust Wallet.",
    category: "user_rejection",
  },
  "Trust: User cancelled": {
    message: "You cancelled the request in Trust Wallet.",
    category: "user_rejection",
  },
  // Rainbow Wallet Errors
  "Rainbow - Rejected": {
    message: "You declined the request in Rainbow.",
    category: "user_rejection",
  },
  // Rabby Wallet Errors
  "Rabby - Rejected": {
    message: "You declined the request in Rabby.",
    category: "user_rejection",
  },
  "Rabby: User rejected": {
    message: "You declined the request in Rabby wallet.",
    category: "user_rejection",
  },
  // Safe (Gnosis) Wallet Errors
  "Safe transaction failed": {
    message: "Safe transaction execution failed.",
    category: "signature",
  },
  "Signature request rejected": {
    message: "Safe signature request was rejected.",
    category: "user_rejection",
  },
  "Transaction rejected by Safe": {
    message: "Transaction was rejected in Safe.",
    category: "user_rejection",
  },
  "Not enough signatures": {
    message: "More signatures are needed for this Safe transaction.",
    category: "signature",
  },
  "Threshold not reached": {
    message: "Not enough owners have signed this Safe transaction.",
    category: "signature",
  },
  // Gnosis Safe / Safe Global Errors
  GS000: {
    message: "Safe initialization failed. Check your setup parameters.",
    category: "contract_error",
  },
  GS013: {
    message:
      "The transaction within your Safe failed. One of the contract calls reverted.",
    category: "contract_error",
  },
  GS025: {
    message:
      "Transaction hash not approved. Owners need to sign the same data.",
    category: "contract_error",
  },
  GS026: {
    message: "Invalid owner provided. The address is not part of this Safe.",
    category: "contract_error",
  },
  GS031: {
    message: "The Safe is locked for this operation. Try again shortly.",
    category: "contract_error",
  },
  // Argent Wallet Errors
  "Argent - Rejected": {
    message: "You declined the request in Argent.",
    category: "user_rejection",
  },
  "Guardian signature required": {
    message: "Your Argent guardian needs to approve this.",
    category: "user_rejection",
  },
  // Frame Wallet Errors
  "Frame - Rejected": {
    message: "You declined the request in Frame.",
    category: "user_rejection",
  },
  // Zerion Wallet Errors
  "Zerion - Rejected": {
    message: "You declined the request in Zerion.",
    category: "user_rejection",
  },
  // Wallet Standard Errors
  "Wallet not installed": {
    message: "Please install a compatible wallet.",
    category: "wallet_connection",
  },
  "Wallet not found": {
    message: "Wallet not detected. Please install one.",
    category: "wallet_connection",
  },
  "Wallet not connected": {
    message: "Wallet not connected. Please connect first.",
    category: "wallet_connection",
  },
  "No accounts found": {
    message: "No accounts found in your wallet.",
    category: "wallet_connection",
  },
  "Account changed": {
    message: "Your wallet account changed. Please verify.",
    category: "wallet_connection",
  },
  "Chain changed": {
    message: "Your wallet network changed.",
    category: "chain_mismatch",
  },
  "Wallet disconnected": {
    message: "Wallet was disconnected. Please reconnect.",
    category: "wallet_connection",
  },
  // Additional Common Error Patterns
  // ============================================
  "Invalid chain": {
    message: "Invalid blockchain network. Please switch networks.",
    category: "chain_mismatch",
  },
  "Chain not supported": {
    message: "This blockchain is not supported.",
    category: "chain_mismatch",
  },
  "Invalid token": {
    message: "Invalid token address. Please check the token.",
    category: "contract_error",
  },
  "Token not found": {
    message: "Token not found on this network.",
    category: "contract_error",
  },
  "Pair not found": {
    message: "Trading pair not found. Please check the tokens.",
    category: "liquidity",
  },
  "Route not found": {
    message: "No swap route found. Try different tokens.",
    category: "liquidity",
  },
  "Price impact too high": {
    message: "Price impact is too high. Try a smaller amount.",
    category: "slippage",
  },
  "Minimum amount not met": {
    message: "Amount is below the minimum. Try a larger amount.",
    category: "contract_error",
  },
  "Maximum amount exceeded": {
    message: "Amount exceeds the maximum. Try a smaller amount.",
    category: "contract_error",
  },
  "Pool not found": {
    message: "Liquidity pool not found. Please check the tokens.",
    category: "liquidity",
  },
  "Pool paused": {
    message: "This pool is paused. Please try again later.",
    category: "protocol_limit",
  },
  "Pool closed": {
    message: "This pool is closed. Please try a different pool.",
    category: "protocol_limit",
  },
  "Invalid deadline": {
    message: "Transaction deadline is invalid. Please try again.",
    category: "contract_error",
  },
  "Deadline too short": {
    message: "Transaction deadline is too short. Please increase it.",
    category: "contract_error",
  },
  "Invalid recipient": {
    message: "Invalid recipient address. Please check the address.",
    category: "contract_error",
  },
  "Invalid sender": {
    message: "Invalid sender address. Please check your wallet.",
    category: "contract_error",
  },
  "Invalid amount": {
    message: "Invalid amount specified. Please check your input.",
    category: "contract_error",
  },
  "Amount too small": {
    message: "Amount is too small. Please try a larger amount.",
    category: "contract_error",
  },
  "Amount too large": {
    message: "Amount is too large. Please try a smaller amount.",
    category: "contract_error",
  },
  "Zero amount": {
    message: "Amount cannot be zero. Please specify an amount.",
    category: "contract_error",
  },
  "Same token": {
    message: "Cannot swap the same token. Please select different tokens.",
    category: "contract_error",
  },
  "Invalid path": {
    message: "Invalid swap path. Please try again.",
    category: "contract_error",
  },
  "Path too long": {
    message: "Swap path is too long. Please try a simpler route.",
    category: "contract_error",
  },
  "Path not found": {
    message: "No swap path found. Please try different tokens.",
    category: "liquidity",
  },
  "recipient address is required": {
    message:
      "Recipient address is required. Please enter the recipient's wallet address.",
    category: "contract_error",
  },
  "amount must be greater than 0": {
    message: "Please enter an amount greater than 0.",
    category: "contract_error",
  },
  "token chain id is required": {
    message:
      "Network information is missing. Please select the correct network for this token.",
    category: "contract_error",
  },
  "token address is required": {
    message:
      "Token address is required. Please provide a token contract address.",
    category: "contract_error",
  },
  "token decimals is required": {
    message:
      "Token decimal is required. Please provide the correct token details.",
    category: "contract_error",
  },
  "wallet not connected or chain not selected": {
    message:
      "Wallet not connected or network not selected. Please connect your wallet and choose the correct network.",
    category: "contract_error",
  },
  "fee rate unavailable": {
    message:
      "Unable to calculate transaction fees. Please try again in a moment.",
    category: "contract_error",
  },
  "missing exchange params": {
    message:
      "Exchange parameters are missing. Please refresh the page and try again.",
    category: "contract_error",
  },
  "exchange order failed": {
    message:
      "Exchange order could not be completed. Please try again or contact support.",
    category: "contract_error",
  },
  // Bitcoin / UTXO Errors
  "utxo fetch failed": {
    message:
      "Unable to calculate transaction fees (UTXO). Please try again in a moment.",
    category: "contract_error",
  },
  "psbt signing failed": {
    message:
      "Bitcoin transaction signing failed (PSBT). Please try signing the transaction again.",
    category: "contract_error",
  },
  "invalid signed psbt": {
    message:
      "Invalid Bitcoin transaction signature (PSBT). Please sign the transaction again.",
    category: "contract_error",
  },
  // EVM Additional Errors
  "has not been authorized by the user": {
    message:
      "Wallet connection issue detected. Please disconnect and reconnect your wallet.",
    category: "contract_error",
  },
  "fail swap, not enough fee": {
    message:
      "Swap failed due to insufficient funds. Please ensure you have enough funds to complete the transaction.",
    category: "contract_error",
  },
  "insufficient native currency sent": {
    message:
      "Not enough native currency was sent with the transaction. Please check the required amount and try again.",
    category: "insufficient_funds",
  },
  "stack limit reached": {
    message:
      "Stack limit reached. This might be due to complex operations or infinite loops. Please try again with a simpler operation.",
    category: "contract_error",
  },
  "method handler crashed": {
    message: "There is an error in the operation. Please try again.",
    category: "contract_error",
  },
  "execution timeout": {
    message: "Transaction took too long to execute. Please try again.",
    category: "timeout",
  },
  "filter not found": {
    message: "Filter expired. Please try again.",
    category: "contract_error",
  },
  "attempting to switch chain": {
    message:
      "Unable to switch to the required network. Please manually switch networks in your wallet.",
    category: "chain_mismatch",
  },
  // Additional RPC Error Codes
  "-32009": {
    message: "Debug requests are currently limited. Please try again later.",
    category: "network",
  },
  "-32010": {
    message: "Transaction cost exceeds gas limit. Please increase gas limit.",
    category: "network",
  },
  "-32011": {
    message:
      "Network connection error. Please check your connection and try again.",
    category: "network",
  },
  "-32015": {
    message:
      "Smart contract execution failed. Please check your transaction parameters and try again.",
    category: "network",
  },
  "-32612": {
    message: "Custom traces are not available.",
    category: "network",
  },
  "-32613": {
    message: "Requested trace type not allowed.",
    category: "network",
  },
  LogRangeLimited: {
    message:
      "Too many blocks requested at once (limit: 10,000). Please reduce the block range.",
    category: "network",
  },
  CustomTracesBlocked: {
    message: "Custom traces are not available.",
    category: "network",
  },
  // Layer 2 / Rollup Errors
  // ============================================
  "L2: insufficient balance": {
    message: "Insufficient balance on Layer 2. Please bridge funds.",
    category: "insufficient_funds",
  },
  "L2: deposit pending": {
    message: "Deposit to Layer 2 is still pending. Please wait.",
    category: "bridge",
  },
  "L2: withdrawal pending": {
    message: "Withdrawal from Layer 2 is still pending. Please wait.",
    category: "bridge",
  },
  "L2: bridge error": {
    message: "Bridge error occurred. Please try again.",
    category: "bridge",
  },
  "L2: not available": {
    message: "Layer 2 feature is not available. Please try again later.",
    category: "bridge",
  },
};
