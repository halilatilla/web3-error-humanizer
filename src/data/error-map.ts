export const DEFAULT_FALLBACK_MESSAGE = "Transaction failed. Please try again.";

/**
 * Comprehensive error map covering:
 * - Ethers.js error codes
 * - MetaMask/EIP-1193 error codes
 * - Phantom/Solana wallet errors
 * - TON/TonConnect errors
 * - Tron/TronLink errors
 * - Sui wallet errors
 * - Aptos wallet errors
 * - Uniswap V2/V3 errors
 * - PancakeSwap errors
 * - SushiSwap errors
 * - Generic ERC20 errors
 * - Gas-related errors
 * - WalletConnect/Reown errors
 * - Network errors
 */
export const LOCAL_ERROR_MAP: Record<string, string> = {
  // ============================================
  // User Actions / Wallet Rejections (Generic)
  // ============================================
  ACTION_REJECTED: "The transaction was cancelled in your wallet.",
  USER_REJECTED: "You declined the request in your wallet.",
  "User rejected": "You declined the request in your wallet.",
  "User denied": "You declined the request in your wallet.",
  "user rejected transaction": "You cancelled the transaction in your wallet.",
  "user rejected signing": "You cancelled the signing request.",
  "Request rejected": "You declined the request in your wallet.",
  "User cancelled": "You cancelled the transaction.",
  "User closed": "You closed the wallet popup without completing the action.",
  "Rejected by user": "You declined the request.",
  "User disapproved": "You declined the request.",

  // ============================================
  // Insufficient Funds / Balance Errors
  // ============================================
  INSUFFICIENT_FUNDS:
    "You don't have enough gas (ETH/native token) to pay for this transaction.",
  "insufficient funds": "You don't have enough balance for this transaction.",
  "insufficient balance": "Your token balance is too low for this swap.",
  "exceeds balance": "The amount exceeds your available balance.",
  "transfer amount exceeds balance":
    "You're trying to send more tokens than you have.",
  "burn amount exceeds balance":
    "You're trying to burn more tokens than you have.",
  InsufficientBalance: "Your balance is too low for this transaction.",

  // ============================================
  // Aave V3 / Lending Pool Errors (VL_*)
  // ============================================
  VL_BORROWING_NOT_ENABLED: "Borrowing is disabled for this asset right now.",
  VL_SUPPLY_CAP_EXCEEDED:
    "Supply cap reached for this asset. Try a smaller deposit or wait.",
  VL_BORROW_CAP_EXCEEDED:
    "Borrow cap reached for this asset. Try a smaller amount or another asset.",
  VL_COLLATERAL_CANNOT_COVER_NEW_BORROW:
    "Not enough collateral for this borrow. Add more collateral or reduce amount.",
  VL_HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD:
    "Position is too risky. Add collateral or reduce your borrow.",
  VL_COLLATERAL_BALANCE_IS_ZERO:
    "You have no collateral for this position. Supply collateral first.",
  VL_TRANSFER_NOT_ALLOWED:
    "Transfer blocked because the asset is used as collateral or frozen.",
  VL_INVALID_HEALTH_FACTOR:
    "Health factor is invalid. Refresh your position and try again.",
  VL_LIQUIDATION_CALL_FAILED:
    "Liquidation could not be executed. Check position or try again later.",
  SAFECAST_OVERFLOW:
    "Internal math overflow. Try again with updated parameters or smaller size.",

  // ============================================
  // ERC-6093 Standard Custom Errors
  // ============================================
  ERC20InsufficientBalance:
    "Your token balance is too low for this transaction.",
  ERC20InvalidSender: "Invalid sender address for this token transaction.",
  ERC20InvalidReceiver: "Invalid recipient address for this token transaction.",
  ERC20InsufficientAllowance:
    "You need to approve more tokens before this transaction.",
  ERC20InvalidApprover: "Invalid address used for token approval.",
  ERC20InvalidSpender: "Invalid spender address for token approval.",
  ERC721InvalidOwner: "You do not own this NFT.",
  ERC721InvalidSender: "You are not authorized to send this NFT.",
  ERC721InvalidReceiver: "Invalid recipient address for this NFT.",
  ERC721InsufficientApproval: "You need to approve this NFT transfer first.",
  ERC721IncorrectOwner: "The NFT is not owned by the expected address.",
  ERC1155InsufficientBalance: "You do not have enough of these tokens/NFTs.",
  ERC1155InvalidSender: "You are not authorized to send these tokens.",
  ERC1155InvalidReceiver: "Invalid recipient address for these tokens.",
  ERC1155InsufficientApproval: "You need to approve this transfer first.",

  // ============================================
  // ERC-4337 EntryPoint Errors (Account Abstraction)
  // ============================================
  AA10: "Account already exists. You cannot initialize it again.",
  AA13: "Wallet creation failed. Check if your factory has enough gas.",
  AA20: "Smart account not deployed yet. Please ensure the first transaction includes initCode.",
  AA21: "You don't have enough native tokens to pay for this transaction's gas.",
  AA23: "Transaction validation failed. This usually means the signature is wrong or gas is too low.",
  AA24: "Signature error. Your wallet couldn't verify the transaction author.",
  AA25: "Transaction sequence error. Another transaction from this account might be pending.",
  AA31: "The gas sponsor (Paymaster) has run out of funds. Try again later.",
  AA33: "Gas sponsorship was rejected. You might not meet the sponsor's criteria.",
  AA40: "Transaction verification took too much gas. Try increasing the gas limit.",
  AA51: "Execution failed after validation. The smart contract logic reverted.",

  // ============================================
  // Allowance / Approval Errors
  // ============================================
  "insufficient allowance":
    "You need to approve the token first before swapping.",
  "allowance exceeded":
    "Token approval needed. Please approve the token first.",
  "ERC20: insufficient allowance": "Please approve the token before swapping.",
  "SafeERC20: low-level call failed":
    "Token transfer failed. The token may require approval or has transfer restrictions.",
  TRANSFER_FROM_FAILED:
    "Token approval failed or you have insufficient balance of the token you are selling.",
  STF: "Token transfer failed. Make sure you have approved the token.",
  "TransferHelper: TRANSFER_FROM_FAILED":
    "Token transfer failed. Please approve the token or check your balance.",
  "TransferHelper::transferFrom: transferFrom failed":
    "Token transfer failed. Please approve or check balance.",

  // ============================================
  // Slippage / Price Impact Errors
  // ============================================
  INSUFFICIENT_OUTPUT_AMOUNT:
    "Price moved too much. Try increasing your slippage tolerance.",
  INSUFFICIENT_INPUT_AMOUNT:
    "Input amount too small for this swap. Try a larger amount.",
  EXCESSIVE_INPUT_AMOUNT:
    "Price moved unfavorably. Try increasing your slippage tolerance.",
  "Too little received":
    "Price changed too much. Increase your slippage tolerance.",
  "Too much requested": "Price changed unfavorably. Try increasing slippage.",
  "Price slippage check":
    "Price moved beyond your slippage tolerance. Try increasing it.",
  SlippageToleranceExceeded:
    "Price moved too much. Increase your slippage tolerance.",
  INSUFFICIENT_LIQUIDITY:
    "Not enough liquidity for this trade. Try a smaller amount.",
  InsufficientLiquidity:
    "Not enough liquidity. Try a smaller amount or different pair.",

  // ============================================
  // Uniswap V2 Errors
  // ============================================
  "UniswapV2: K": "Low liquidity for this pair. Try a smaller swap amount.",
  "UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase your slippage tolerance.",
  "UniswapV2: INSUFFICIENT_INPUT_AMOUNT":
    "Input amount is too small. Try a larger amount.",
  "UniswapV2: INSUFFICIENT_LIQUIDITY":
    "Not enough liquidity for this swap. Try a smaller amount.",
  "UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED":
    "Not enough liquidity to remove. Try a smaller amount.",
  "UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED":
    "Insufficient liquidity to add. Try different amounts.",
  "UniswapV2: EXPIRED": "Quote expired. Please try the swap again.",
  "UniswapV2: INVALID_TO": "Invalid recipient address for this swap.",
  "UniswapV2: OVERFLOW": "Amount too large. Try a smaller swap.",
  "UniswapV2: LOCKED": "This pair is currently locked. Try again shortly.",
  "UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase slippage tolerance.",
  "UniswapV2Router: EXCESSIVE_INPUT_AMOUNT":
    "Price moved unfavorably. Increase slippage tolerance.",
  "UniswapV2Router: EXPIRED": "Transaction expired. Please try again.",
  "UniswapV2Library: INSUFFICIENT_AMOUNT":
    "Amount too small for this operation.",
  "UniswapV2Library: INSUFFICIENT_LIQUIDITY":
    "Not enough liquidity for this trade.",
  "UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT":
    "Input amount too small. Try a larger amount.",
  "UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase slippage.",

  // ============================================
  // Uniswap V3 Errors
  // ============================================
  "UniswapV3: SPL": "Price limit reached. Try a different price range.",
  "UniswapV3: LOK": "Pool is locked. Try again in a moment.",
  "UniswapV3: TLU": "Tick spacing error. Try a different price range.",
  "UniswapV3: TLM": "Tick limit reached. Adjust your price range.",
  "UniswapV3: TUM": "Tick upper limit reached.",
  "UniswapV3: AI": "Amount insufficient. Try a larger amount.",
  "UniswapV3: M0": "Not enough token0 liquidity.",
  "UniswapV3: M1": "Not enough token1 liquidity.",
  "UniswapV3: AS": "Amount specified is zero.",
  "UniswapV3: IIA": "Invalid amount specified.",
  "UniswapV3: L": "Liquidity error. Try different parameters.",
  "UniswapV3: F0": "Flash loan callback failed for token0.",
  "UniswapV3: F1": "Flash loan callback failed for token1.",
  Old: "Quote expired. Please refresh and try again.",

  // ============================================
  // Uniswap V4 / Hook Errors
  // ============================================
  "UniswapV4: LOK": "The pool is locked. A hook might be preventing re-entry.",
  "UniswapV4: TLU":
    "Price range error. The lower limit is higher than the upper limit.",
  "UniswapV4: SPL":
    "Price limit reached. The trade would move the price too far.",
  "UniswapV4: IIA":
    "Insufficient input amount. The swap didn't send enough tokens to the pool.",
  "UniswapV4: AS": "The trade amount cannot be zero.",
  "UniswapV4: M0": "The pool doesn't have enough of the first token (Token0).",
  "UniswapV4: M1": "The pool doesn't have enough of the second token (Token1).",
  HookReverted:
    "A custom logic 'hook' attached to this pool failed. Try a different route.",
  FeeTooHigh:
    "The dynamic fee set by the pool's hook is too high for this trade.",

  // ============================================
  // PancakeSwap Errors
  // ============================================
  "Pancake: K": "Low liquidity for this pair. Try a smaller swap amount.",
  "Pancake: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase slippage tolerance.",
  "Pancake: INSUFFICIENT_INPUT_AMOUNT":
    "Input amount too small. Try a larger amount.",
  "Pancake: INSUFFICIENT_LIQUIDITY":
    "Not enough liquidity. Try a smaller amount.",
  "Pancake: EXPIRED": "Quote expired. Please try the swap again.",
  "Pancake: TRANSFER_FAILED": "Token transfer failed. Check your approval.",
  "Pancake: LOCKED": "Pool is currently locked. Try again shortly.",
  "PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase slippage.",
  "PancakeRouter: EXCESSIVE_INPUT_AMOUNT":
    "Price moved unfavorably. Increase slippage.",
  "PancakeRouter: EXPIRED": "Transaction expired. Please try again.",
  "PancakeLibrary: INSUFFICIENT_AMOUNT": "Amount too small for this operation.",
  "PancakeLibrary: INSUFFICIENT_LIQUIDITY":
    "Not enough liquidity for this trade.",

  // ============================================
  // SushiSwap Errors
  // ============================================
  "SushiSwap: K": "Low liquidity. Try a smaller swap amount.",
  "SushiSwap: INSUFFICIENT_OUTPUT_AMOUNT":
    "Price moved too much. Increase slippage tolerance.",
  "SushiSwap: INSUFFICIENT_LIQUIDITY": "Not enough liquidity for this swap.",
  "SushiSwap: EXPIRED": "Quote expired. Please try again.",

  // ============================================
  // 1inch / Aggregator Errors
  // ============================================
  "1inch: minReturn": "Price moved too much. Increase slippage tolerance.",
  ReturnAmountIsNotEnough: "Price moved too much. Increase slippage tolerance.",
  "Min return not reached":
    "Minimum return not met. Increase your slippage tolerance.",
  "1inch: insufficient output amount":
    "Price moved too much. Increase slippage tolerance.",
  "1inch: insufficient input amount":
    "Input amount too small. Try a larger amount.",
  "1inch: insufficient liquidity":
    "Not enough liquidity. Try a smaller amount.",
  "1inch: expired": "Quote expired. Please try again.",
  "1inch: transfer failed": "Token transfer failed. Check your approval.",
  // Curve Finance Errors
  "Curve: insufficient output":
    "Price moved too much. Increase slippage tolerance.",
  "Curve: insufficient input": "Input amount too small. Try a larger amount.",
  "Curve: insufficient liquidity": "Not enough liquidity for this trade.",
  "Curve: expired": "Quote expired. Please try again.",
  "Curve: slippage": "Price moved beyond your slippage tolerance.",
  "Curve: math error": "Calculation error. Please try again.",
  // Balancer Errors
  "Balancer: insufficient output":
    "Price moved too much. Increase slippage tolerance.",
  "Balancer: insufficient input":
    "Input amount too small. Try a larger amount.",
  "Balancer: insufficient liquidity": "Not enough liquidity for this trade.",
  "Balancer: expired": "Quote expired. Please try again.",
  "Balancer: paused": "Pool is paused. Please try again later.",
  "Balancer: swap disabled": "Swap is disabled for this pool.",
  // DODO Errors
  "DODO: insufficient output":
    "Price moved too much. Increase slippage tolerance.",
  "DODO: insufficient input": "Input amount too small. Try a larger amount.",
  "DODO: insufficient liquidity": "Not enough liquidity for this trade.",
  "DODO: expired": "Quote expired. Please try again.",
  // KyberSwap Errors
  "KyberSwap: insufficient output":
    "Price moved too much. Increase slippage tolerance.",
  "KyberSwap: insufficient input":
    "Input amount too small. Try a larger amount.",
  "KyberSwap: insufficient liquidity": "Not enough liquidity for this trade.",
  "KyberSwap: expired": "Quote expired. Please try again.",

  // ============================================
  // Gas Related Errors
  // ============================================
  "gas required exceeds allowance":
    "Gas limit too low. Try increasing the gas limit.",
  "intrinsic gas too low":
    "Gas limit is too low for this transaction. Increase gas limit.",
  "out of gas": "Transaction ran out of gas. Try increasing the gas limit.",
  "exceeds block gas limit":
    "Transaction too large. Try splitting into smaller transactions.",
  "max fee per gas less than block base fee":
    "Gas price too low. Increase your gas fee.",
  "replacement transaction underpriced":
    "Gas price too low to replace pending transaction. Increase gas fee.",
  REPLACEMENT_UNDERPRICED:
    "Gas price too low to speed up transaction. Increase gas fee.",
  "max priority fee per gas higher than max fee per gas":
    "Invalid gas settings. Priority fee cannot exceed max fee.",
  "transaction underpriced":
    "Gas price too low. Increase your gas fee and try again.",

  // ============================================
  // Nonce Errors
  // ============================================
  NONCE_EXPIRED: "Transaction outdated. Please refresh and try again.",
  "nonce too low":
    "You have a pending transaction. Wait for it to complete or speed it up.",
  "nonce too high":
    "Transaction sequence error. Try resetting your wallet's transaction history.",
  "already known":
    "This transaction is already pending. Please wait for it to complete.",
  "replacement fee too low":
    "Fee too low to replace pending transaction. Increase gas fee.",

  // ============================================
  // Transaction Errors
  // ============================================
  TRANSACTION_REPLACED: "Your transaction was replaced by another one.",
  EXPIRED:
    "The swap took too long to confirm. Please try again with a higher gas fee.",
  "transaction failed": "The transaction failed. Please try again.",
  "execution reverted":
    "Transaction was rejected by the network. Check your inputs.",
  reverted: "Transaction failed. Please check your inputs and try again.",
  revert: "Transaction failed. Please check your inputs and try again.",
  CALL_EXCEPTION: "The contract call failed. Please try again.",
  "invalid opcode":
    "Smart contract error. Please try again or contact support.",
  "stack too deep": "Smart contract error. Please try again.",
  NOT_IMPLEMENTED: "This feature is not implemented yet.",
  UNSUPPORTED_OPERATION: "This operation is not supported.",
  SERVER_ERROR: "Server error occurred. Please try again.",
  BAD_DATA: "Invalid data provided. Please check your inputs.",
  CANCELLED: "The operation was cancelled.",
  BUFFER_OVERRUN: "Buffer overflow error. Please try again.",
  NUMERIC_FAULT: "Numeric calculation error. Please check your values.",
  INVALID_ARGUMENT: "Invalid argument provided. Please check your inputs.",
  MISSING_ARGUMENT:
    "Required argument is missing. Please provide all required parameters.",
  UNEXPECTED_ARGUMENT:
    "Unexpected argument provided. Please check your inputs.",
  VALUE_MISMATCH: "Value mismatch error. Please check your inputs.",
  UNCONFIGURED_NAME: "Name not configured. Please check your configuration.",
  OFFCHAIN_FAULT: "Off-chain error occurred. Please try again.",

  // ============================================
  // Solidity Panic Codes (0x...)
  // ============================================
  "0x01": "Assertion failed. Internal contract error.",
  "0x11": "Arithmetic error: Number too big or too small (overflow/underflow).",
  "0x12": "Division by zero error.",
  "0x21": "Invalid number conversion (enum conversion failed).",
  "0x22": "Data storage error (incorrectly encoded storage byte array).",
  "0x31": "Empty array pop error.",
  "0x32": "Array index out of bounds exception.",
  "0x41": "Memory allocation error (too much memory requested).",
  "0x51": "Internal function call error (zero-initialized variable).",

  // ============================================
  // Network / Connection Errors
  // ============================================
  NETWORK_ERROR:
    "Network connection issue. Please check your internet and try again.",
  "network changed": "Network changed. Please reconnect your wallet.",
  TIMEOUT: "Request timed out. Please check your connection and try again.",
  "Failed to fetch": "Network error. Please check your internet connection.",
  NetworkError: "Connection failed. Check your internet and try again.",
  "could not detect network":
    "Unable to connect to the network. Please try again.",
  "missing response": "No response from the network. Please try again.",
  "connection refused": "Could not connect to the network. Try again later.",
  ETIMEDOUT: "Connection timed out. Please try again.",
  ECONNREFUSED: "Connection refused. Please try again later.",
  "network does not support": "This feature is not supported on this network.",

  // ============================================
  // RPC Errors (EIP-1193 & EIP-1474)
  // ============================================
  "-32700": "Invalid request format (Parse Error). Please try again.",
  "-32600": "Invalid request. Please try again.",
  "-32601": "Method not supported by your wallet.",
  "-32602": "Invalid parameters. Please check your inputs.",
  "-32603": "Internal JSON-RPC error. Please try again.",
  "-32000": "Server error. Please try again.",
  "-32001": "Resource not found. Please try again.",
  "-32002": "Request already pending. Please wait.",
  "-32003": "Transaction rejected by the network.",
  "-32004": "Method not supported.",
  "-32005": "Request limit exceeded. Please wait and try again.",
  "-32006": "Request limit exceeded. Please wait and try again.",
  "4001": "You declined the request in your wallet.",
  "4100": "Wallet is locked or the requested method is not authorized.",
  "4200": "This method is not supported by your wallet.",
  "4900": "Wallet is disconnected. Please reconnect.",
  "4901": "Wallet is connected to a different network. Please switch networks.",
  "5000": "User rejected the request.",
  "5001": "Chain ID does not match.",
  // Viem-specific errors
  InternalRpcError: "Internal RPC error. Please try again.",
  HttpRequestError: "HTTP request failed. Please check your connection.",
  InvalidInputError: "Invalid input provided. Please check your parameters.",
  TransactionNotFoundError:
    "Transaction not found. Please check the transaction hash.",
  BlockNotFoundError: "Block not found. Please check the block number or hash.",
  LogNotFoundError: "Log not found. Please check your query parameters.",

  // ============================================
  // WalletConnect / Reown Errors
  // ============================================
  "Session expired": "Your session expired. Please reconnect your wallet.",
  "Session disconnected": "Wallet disconnected. Please reconnect.",
  "WalletConnect: User rejected": "You declined the request in your wallet.",
  "No matching key": "Session not found. Please reconnect your wallet.",
  "Pairing expired": "Connection expired. Please scan the QR code again.",
  "Topic is not a pairing topic":
    "Invalid wallet connection. Please reconnect.",
  "Missing or invalid": "Connection error. Please try reconnecting.",
  "Relay connection failed": "Connection to wallet relay failed. Try again.",

  // ============================================
  // MetaMask Specific Errors
  // ============================================
  "MetaMask Tx Signature":
    "MetaMask encountered an issue signing the transaction.",
  "MetaMask Message Signature":
    "MetaMask couldn't sign the message. Please try again.",
  "MetaMask Personal Message Signature":
    "MetaMask personal sign failed. Please try again.",
  "MetaMask Typed Message Signature":
    "MetaMask typed data signing failed. Please try again.",
  "MetaMask Chain": "Please switch networks in MetaMask to continue.",
  "MetaMask RPC Error": "MetaMask encountered an RPC error. Please try again.",
  "User denied account authorization":
    "You declined to connect your MetaMask account.",
  "Already processing eth_requestAccounts":
    "MetaMask is already processing a connection request.",
  "Request of type 'wallet_requestPermissions' already pending":
    "A permission request is already pending in MetaMask.",
  "eth_accounts not supported": "Please unlock MetaMask and try again.",

  // ============================================
  // Phantom / Solana Wallet Errors
  // ============================================
  WalletNotConnectedError:
    "Wallet not connected. Please connect your wallet first.",
  WalletConnectionError: "Failed to connect wallet. Please try again.",
  WalletSendTransactionError: "Failed to send transaction. Please try again.",
  WalletSignTransactionError: "You cancelled the transaction signing.",
  WalletSignMessageError: "Message signing failed. Please try again.",
  WalletNotReadyError:
    "Wallet not ready. Please ensure it's installed and unlocked.",
  WalletPublicKeyError: "Could not get wallet address. Please reconnect.",
  WalletDisconnectionError: "Failed to disconnect wallet. Please try again.",
  WalletAccountError: "Could not access wallet account.",
  WalletNotSelectedError: "No wallet selected. Please select a wallet first.",
  "Phantom - Rejected": "You declined the request in Phantom.",
  "Phantom - Unauthorized": "Phantom is not authorized. Please connect first.",
  "Phantom - Disconnected": "Phantom is disconnected. Please reconnect.",
  "Phantom wallet not found":
    "Phantom wallet not detected. Please install Phantom.",
  "Solflare - Rejected": "You declined the request in Solflare.",
  "Backpack - Rejected": "You declined the request in Backpack.",
  "Transaction simulation failed":
    "Transaction simulation failed. Check your inputs.",
  "Blockhash not found": "Transaction expired. Please try again.",
  "Transaction was not confirmed":
    "Transaction wasn't confirmed in time. It may still succeed.",
  "block height exceeded":
    "Transaction expired. Please try again with fresh blockhash.",
  "Signature verification failed": "Transaction signature verification failed.",
  "Account not found": "Wallet account not found. Please check the address.",
  "Insufficient SOL": "Not enough SOL for transaction fees.",
  "Insufficient lamports": "Not enough SOL balance for this transaction.",
  "Program failed to complete":
    "The program execution failed. Please try again.",
  "custom program error":
    "Smart contract returned an error. Please check your inputs.",
  AccountNotFound: "The specified account doesn't exist.",
  InstructionError: "Transaction instruction failed. Please check your inputs.",
  InvalidAccountData: "Invalid account data. Please try again.",
  // Solana / Jupiter Aggregator Errors
  "0x1771":
    "Price moved beyond your slippage limit on Solana. Try increasing it.",
  "0x1788": "Jupiter route calculation error. Try refreshing the quote.",
  "0x1":
    "Solana program error. Usually indicates insufficient funds or invalid instruction.",
  "0x1770": "The liquidity pool has changed. Refresh the page for a new quote.",
  "Slippage tolerance exceeded":
    "Price changed too fast. Increase your slippage tolerance.",
  "Compute budget exceeded":
    "The transaction is too complex for Solana. Try a simpler route.",
  BlockhashNotFound:
    "Transaction expired. Solana network is busy, please try again.",

  // ============================================
  // TON / TonConnect Errors
  // ============================================
  USER_REJECTS_ERROR: "You declined the request in your TON wallet.",
  UNKNOWN_APP_ERROR: "Unknown app error. Please reconnect your wallet.",
  BAD_REQUEST_ERROR: "Invalid request. Please try again.",
  UNKNOWN_ERROR: "An unknown error occurred in your TON wallet.",
  METHOD_NOT_SUPPORTED: "This method is not supported by your TON wallet.",
  TON_CONNECT_ERROR: "TON Connect error. Please reconnect your wallet.",
  "Tonkeeper - Rejected": "You declined the request in Tonkeeper.",
  "Tonkeeper - Cancelled": "You cancelled the request in Tonkeeper.",
  "OpenMask - Rejected": "You declined the request in OpenMask.",
  "MyTonWallet - Rejected": "You declined the request in MyTonWallet.",
  "TonConnect: Connection was closed":
    "Wallet connection was closed. Please reconnect.",
  "TonConnect: Bridge connection error":
    "Connection error. Please try reconnecting your TON wallet.",
  "TonConnect: Session not found":
    "Session expired. Please reconnect your TON wallet.",
  "Unable to verify source":
    "Unable to verify wallet source. Please reconnect.",
  "Wallet is not connected": "TON wallet not connected. Please connect first.",
  "Invalid BOC": "Invalid transaction data. Please try again.",
  "Not enough TON": "Not enough TON for this transaction.",
  "Not enough balance": "Insufficient balance for this transaction.",
  "Cell underflow":
    "Transaction data mismatch (cellUnderflow). Please check your parameters and try again.",
  "Cell overflow":
    "Transaction data is too large (cellOverflow). Please check your parameters and try again.",
  "Invalid seqno":
    "Transaction sequence number is incorrect. Please try again.",
  "Bounced transaction":
    "Transaction was rejected and bounced back. Please check your transaction parameters.",
  "Invalid fees":
    "Transaction fees are insufficient. Please increase the fee amount and try again.",

  // ============================================
  // Tron / TronLink Errors
  // ============================================
  "TronLink - Rejected": "You declined the request in TronLink.",
  "TronLink - Cancelled": "You cancelled the request in TronLink.",
  "TronLink not installed": "Please install TronLink wallet extension.",
  "TronLink is locked": "TronLink is locked. Please unlock it first.",
  "TronLink not ready": "TronLink is not ready. Please wait and try again.",
  "Confirmation declined by user": "You declined the transaction in TronLink.",
  BANDWITH: "Not enough bandwidth for this transaction. Please freeze TRX.",
  BANDWIDTH: "Not enough bandwidth. Please freeze TRX for bandwidth.",
  ENERGY:
    "Not enough energy for this transaction. Please freeze TRX for energy.",
  BALANCE_NOT_SUFFICIENT: "Insufficient TRX balance.",
  CONTRACT_VALIDATE_ERROR:
    "Contract validation failed. Please check your inputs.",
  REVERT: "Transaction reverted. Please check your inputs.",
  OUT_OF_ENERGY:
    "Out of energy. Please freeze TRX or reduce transaction complexity.",
  "Account resource insufficient":
    "Not enough bandwidth or energy. Please freeze TRX.",
  "Contract not found": "Smart contract not found. Please check the address.",
  "FoxWallet - Rejected": "You declined the request in FoxWallet.",

  // ============================================
  // Sui Wallet Errors
  // ============================================
  "WALLET.CONNECT_ERROR": "Failed to connect to Sui wallet. Please try again.",
  "WALLET.DISCONNECT_ERROR": "Failed to disconnect from Sui wallet.",
  "WALLET.SIGN_TX_ERROR": "Transaction signing failed or was rejected.",
  "WALLET.SIGN_MSG_ERROR": "Message signing failed. Please try again.",
  "WALLET.LISTEN_TO_EVENT_ERROR": "Failed to listen to wallet events.",
  "WALLET.METHOD_NOT_IMPLEMENTED_ERROR":
    "This method is not supported by your wallet.",
  "WALLET.CONNECT_ERROR__USER_REJECTED":
    "You declined to connect your Sui wallet.",
  "Sui Wallet - Rejected": "You declined the request in Sui Wallet.",
  "Suiet - Rejected": "You declined the request in Suiet wallet.",
  "Ethos - Rejected": "You declined the request in Ethos wallet.",
  "Martian Sui - Rejected": "You declined the request in Martian Sui wallet.",
  "Insufficient gas": "Not enough SUI for gas fees.",
  InsufficientGas: "Not enough SUI to pay for transaction fees.",
  InsufficientCoinBalance: "Insufficient coin balance for this transaction.",
  ObjectNotFound: "The specified object was not found on chain.",
  InvalidTxSignature: "Invalid transaction signature.",
  MoveAbort: "Smart contract execution failed.",
  PackageNotFound: "Package not found. Please check the address.",
  DynamicFieldNotFound: "Dynamic field not found.",
  InvalidPublicKey: "Invalid public key provided.",
  ModuleNotFound:
    "Contract module not found. Please verify the contract details.",
  FunctionNotFound:
    "The requested contract function is not found. Please check your transaction parameters.",
  GasComputationError:
    "Unable to calculate gas fees. Please try again or contact support.",
  ConsensusError:
    "Network consensus validation failed. Please try again in a moment.",
  InvalidObjectOwner:
    "Invalid object owner. Please check your transaction parameters.",
  ObjectVersionNotFound:
    "Object version not found. Please check your transaction parameters.",
  InvalidObjectType:
    "Invalid object type. Please check your transaction parameters.",
  InvalidObjectId:
    "Invalid object ID. Please check your transaction parameters.",

  // ============================================
  // Aptos Wallet Errors
  // ============================================
  "Petra - Rejected": "You declined the request in Petra wallet.",
  "Pontem - Rejected": "You declined the request in Pontem wallet.",
  "Martian - Rejected": "You declined the request in Martian wallet.",
  "Rise - Rejected": "You declined the request in Rise wallet.",
  "Fewcha - Rejected": "You declined the request in Fewcha wallet.",
  AptosWalletError: "Aptos wallet encountered an error. Please try again.",
  INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE: "Not enough APT for gas fees.",
  SEQUENCE_NUMBER_TOO_OLD: "Transaction sequence error. Please try again.",
  SEQUENCE_NUMBER_TOO_NEW: "Transaction sequence too new. Please wait.",
  TRANSACTION_EXPIRED: "Transaction expired. Please try again.",
  INVALID_AUTH_KEY: "Invalid authentication key.",
  EPENDING_TRANSACTION_EXISTS: "A pending transaction exists. Please wait.",
  MAX_GAS_UNITS_BELOW_MIN_TRANSACTION_GAS_UNITS: "Gas limit too low.",
  MAX_GAS_UNITS_EXCEEDS_MAX_GAS_UNITS_BOUND: "Gas limit too high.",
  GAS_UNIT_PRICE_BELOW_MIN_BOUND: "Gas price too low.",
  GAS_UNIT_PRICE_ABOVE_MAX_BOUND: "Gas price too high.",
  MOVE_ABORT: "Smart contract execution aborted.",
  EXECUTION_LIMIT_REACHED: "Execution limit reached. Please try again.",
  OUT_OF_GAS: "Transaction ran out of gas. Increase gas limit.",
  INVALID_SIGNATURE: "Invalid transaction signature.",
  INVALID_TRANSACTION_PAYLOAD: "Invalid transaction data.",

  // ============================================
  // Bitcoin / Ordinals Wallet Errors
  // ============================================
  "UniSat - Rejected": "You declined the request in UniSat wallet.",
  "Xverse - Rejected": "You declined the request in Xverse wallet.",
  "Leather - Rejected": "You declined the request in Leather wallet.",
  "OKX Wallet - Rejected": "You declined the request in OKX Wallet.",
  "Insufficient BTC": "Not enough BTC for this transaction.",
  "Invalid PSBT": "Invalid transaction format. Please try again.",
  "UTXO not found": "Transaction input not found. Please try again.",

  // ============================================
  // Reown AppKit Error Codes
  // ============================================
  APKT001: "Network not recognized. Please check your network configuration.",
  APKT002: "Domain not allowed. Please verify your domain settings.",
  APKT003: "Wallet failed to load. Check your connection and try again.",
  APKT004: "Wallet timed out. Please try again.",
  APKT005: "Domain not verified. Please verify your domain.",
  APKT006: "Session expired. Please reconnect your wallet.",
  APKT007: "Invalid project configuration. Please check your setup.",
  APKT008: "Project ID missing. Please configure your project ID.",
  APKT009: "Server error. Please try again later.",
  APKT010: "Rate limited. Please wait a moment and try again.",

  // ============================================
  // Token Specific Errors
  // ============================================
  "ERC20: transfer to the zero address":
    "Invalid recipient address. Please check the address.",
  "ERC20: approve to the zero address":
    "Invalid approval address. Please check the address.",
  "ERC20: transfer from the zero address": "Invalid sender address.",
  "ERC20: mint to the zero address": "Invalid minting address.",
  "ERC20: burn from the zero address": "Invalid burn address.",
  "ERC20: decreased allowance below zero":
    "Cannot decrease allowance below zero.",
  "Pausable: paused": "This token is currently paused. Please try later.",
  "Ownable: caller is not the owner":
    "You don't have permission for this action.",
  AccessControl: "You don't have the required permissions for this action.",
  Blacklisted: "This address has been restricted from trading.",
  "Trading not enabled": "Trading is not yet enabled for this token.",
  "Max transaction": "Amount exceeds maximum transaction limit.",
  "Max wallet": "This would exceed the maximum wallet holding limit.",
  "Buy limit": "This exceeds the buy limit for this token.",
  "Sell limit": "This exceeds the sell limit for this token.",
  Cooldown: "Please wait before making another transaction.",
  "Anti-bot": "Transaction blocked by anti-bot protection. Try again shortly.",
  "Tax too high": "Token tax is too high for this trade.",

  // ============================================
  // Contract Interaction Errors
  // ============================================
  "contract not deployed":
    "Smart contract not found on this network. Check the network.",
  "invalid address": "Invalid address provided. Please check and try again.",
  "invalid signature": "Invalid signature. Please try signing again.",
  "signature expired": "Signature expired. Please sign again.",
  deadline: "Transaction deadline passed. Please try again.",
  "Deadline expired": "Quote expired. Please refresh and try again.",
  "Already initialized": "This contract is already set up.",
  "Not initialized": "Contract not ready. Please try again later.",

  // ============================================
  // Permit / Signature Errors
  // ============================================
  "invalid permit": "Permit signature is invalid. Please try approving again.",
  "permit expired": "Permit expired. Please sign a new approval.",
  INVALID_SIGNER: "Invalid signature. Please try signing again.",
  EXPIRED_PERMIT: "Your permit has expired. Please sign again.",

  // ============================================
  // MEV / Sandwich Attack Protection
  // ============================================
  frontrun: "Transaction may have been front-run. Try using MEV protection.",
  sandwich:
    "Potential sandwich attack detected. Consider using MEV protection.",
  MEV: "MEV protection triggered. Try using a private RPC.",

  // ============================================
  // Miscellaneous / Generic Errors
  // ============================================
  "Header not found": "Block not found. Please try again.",
  "Unknown block": "Block not found. The network may be syncing.",
  "pruned data": "Historical data not available. Try a different RPC.",
  "rate limit": "Too many requests. Please wait a moment and try again.",
  "Too Many Requests": "Rate limited. Please wait and try again.",
  exceeded: "Limit exceeded. Please try again later.",
  Forbidden: "Access denied. Please check your permissions.",
  Unauthorized: "Not authorized. Please reconnect your wallet.",

  // ============================================
  // Cross-Chain / Bridge Errors
  // ============================================
  "Bridge error": "Cross-chain bridge error. Please try again.",
  "Bridge timeout": "Bridge transaction timed out. Please check status.",
  "Unsupported chain": "This chain is not supported for this operation.",
  "Chain mismatch": "Your wallet is on the wrong network. Please switch.",
  "Invalid destination": "Invalid destination chain or address.",
  "Bridge paused": "Bridge is paused. Please try again later.",

  // ============================================
  // LayerZero / Messaging Bridges
  // ============================================
  "LayerZero: not enough native for fees":
    "Not enough native token to pay bridge fees. Add gas and retry.",
  "LayerZero: destination chain is not a trusted remote":
    "Destination chain is not trusted. Check the target chain and retry.",
  "LayerZero: invalid payload":
    "Bridge payload invalid. Retry the transaction or contact support.",
  "LayerZero: message blocked. please retry on destination":
    "Bridge message blocked. Retry on the destination chain.",
  "LayerZero: LzTokenUnavailable":
    "The bridge does not have enough liquidity of this token right now.",
  // Li.Fi / Stargate Bridge Errors
  "1001":
    "No route found. Your address might not have enough balance for any available bridge.",
  "1007":
    "Slippage error on the bridge. The exchange rate changed during the transfer.",
  NOT_PROCESSABLE_REFUND_NEEDED:
    "The bridge failed due to price movement. A refund has been triggered.",
  AMOUNT_TOO_LOW: "The amount is too small to bridge. Please send more.",
  AMOUNT_TOO_HIGH:
    "This bridge has a limit. Try a smaller amount or a different bridge.",
  "Stargate: Not enough liquidity":
    "The destination chain's pool is low on funds. Try again later.",

  // ============================================
  // Arbitrum Retryables
  // ============================================
  "retryable ticket expired":
    "Arbitrum retryable expired. Re-send the transaction or re-create the ticket.",
  "insufficient submission cost":
    "L1 submission cost too low. Increase max fee and retry.",
  "max gas too low":
    "Not enough gas for L2 execution. Increase gas limit and retry.",
  "oversize data":
    "Transaction data too large for Arbitrum. Reduce transaction size.",

  // ============================================
  // OP Stack / Optimism
  // ============================================
  "L2 execution failed":
    "Execution failed on L2. Increase gas or check the contract call.",
  "fee too low to cover L1 data":
    "Base fee too low to pay L1 data costs. Increase the fee and retry.",

  // ============================================
  // Ledger / Hardware Wallet Errors
  // ============================================
  "Ledger device": "Please connect and unlock your Ledger device.",
  "Ledger locked": "Your Ledger is locked. Please unlock it.",
  TransportOpenUserCancelled: "Ledger connection was cancelled.",
  TransportInterfaceNotAvailable: "Ledger not accessible. Try reconnecting.",
  DisconnectedDevice: "Ledger disconnected. Please reconnect.",
  DisconnectedDeviceDuringOperation:
    "Ledger disconnected during operation. Please reconnect and retry.",
  "Denied by user on Ledger": "You rejected the request on your Ledger device.",
  "Open app": "Please open the correct app on your Ledger.",
  "App does not seem to be open": "Please open the right app on your Ledger.",
  "Device is busy": "Ledger is busy. Please wait and try again.",
  "Invalid channel": "Invalid Ledger connection. Please reconnect.",
  "Trezor: Action cancelled": "You cancelled the action on your Trezor.",
  "Trezor: PIN cancelled": "PIN entry was cancelled on Trezor.",
  "Trezor: Passphrase cancelled": "Passphrase entry was cancelled on Trezor.",
  "Device call in progress": "Hardware wallet is processing. Please wait.",

  // ============================================
  // Coinbase Wallet Errors
  // ============================================
  "Coinbase Wallet - Rejected": "You declined the request in Coinbase Wallet.",
  "User denied request signature": "You declined the signature request.",
  "QR Code Modal closed": "QR code scanning was cancelled.",

  // ============================================
  // Trust Wallet Errors
  // ============================================
  "Trust Wallet - Rejected": "You declined the request in Trust Wallet.",
  "Trust: User cancelled": "You cancelled the request in Trust Wallet.",

  // ============================================
  // Rainbow Wallet Errors
  // ============================================
  "Rainbow - Rejected": "You declined the request in Rainbow.",

  // ============================================
  // Rabby Wallet Errors
  // ============================================
  "Rabby - Rejected": "You declined the request in Rabby.",
  "Rabby: User rejected": "You declined the request in Rabby wallet.",

  // ============================================
  // Safe (Gnosis) Wallet Errors
  // ============================================
  "Safe transaction failed": "Safe transaction execution failed.",
  "Signature request rejected": "Safe signature request was rejected.",
  "Transaction rejected by Safe": "Transaction was rejected in Safe.",
  "Not enough signatures":
    "More signatures are needed for this Safe transaction.",
  "Threshold not reached":
    "Not enough owners have signed this Safe transaction.",
  // Gnosis Safe / Safe Global Errors
  GS000: "Safe initialization failed. Check your setup parameters.",
  GS013:
    "The transaction within your Safe failed. One of the contract calls reverted.",
  GS025: "Transaction hash not approved. Owners need to sign the same data.",
  GS026: "Invalid owner provided. The address is not part of this Safe.",
  GS031: "The Safe is locked for this operation. Try again shortly.",

  // ============================================
  // Keplr / Cosmos Wallet Errors
  // ============================================
  "Keplr - Rejected": "You declined the request in Keplr.",
  "Request rejected by user": "You declined the request.",
  "Failed to retrieve account":
    "Could not get account from Keplr. Please reconnect.",
  "Key not found": "Account not found. Please add this chain to Keplr.",

  // ============================================
  // Argent Wallet Errors
  // ============================================
  "Argent - Rejected": "You declined the request in Argent.",
  "Guardian signature required": "Your Argent guardian needs to approve this.",

  // ============================================
  // Frame Wallet Errors
  // ============================================
  "Frame - Rejected": "You declined the request in Frame.",

  // ============================================
  // Zerion Wallet Errors
  // ============================================
  "Zerion - Rejected": "You declined the request in Zerion.",

  // ============================================
  // Wallet Standard Errors
  // ============================================
  "Wallet not installed": "Please install a compatible wallet.",
  "Wallet not found": "Wallet not detected. Please install one.",
  "Wallet not connected": "Wallet not connected. Please connect first.",
  "No accounts found": "No accounts found in your wallet.",
  "Account changed": "Your wallet account changed. Please verify.",
  "Chain changed": "Your wallet network changed.",
  "Wallet disconnected": "Wallet was disconnected. Please reconnect.",
  // ============================================
  // Additional Common Error Patterns
  // ============================================
  "Invalid chain": "Invalid blockchain network. Please switch networks.",
  "Chain not supported": "This blockchain is not supported.",
  "Invalid token": "Invalid token address. Please check the token.",
  "Token not found": "Token not found on this network.",
  "Pair not found": "Trading pair not found. Please check the tokens.",
  "Route not found": "No swap route found. Try different tokens.",
  "Price impact too high": "Price impact is too high. Try a smaller amount.",
  "Minimum amount not met": "Amount is below the minimum. Try a larger amount.",
  "Maximum amount exceeded":
    "Amount exceeds the maximum. Try a smaller amount.",
  "Pool not found": "Liquidity pool not found. Please check the tokens.",
  "Pool paused": "This pool is paused. Please try again later.",
  "Pool closed": "This pool is closed. Please try a different pool.",
  "Invalid deadline": "Transaction deadline is invalid. Please try again.",
  "Deadline too short":
    "Transaction deadline is too short. Please increase it.",
  "Invalid recipient": "Invalid recipient address. Please check the address.",
  "Invalid sender": "Invalid sender address. Please check your wallet.",
  "Invalid amount": "Invalid amount specified. Please check your input.",
  "Amount too small": "Amount is too small. Please try a larger amount.",
  "Amount too large": "Amount is too large. Please try a smaller amount.",
  "Zero amount": "Amount cannot be zero. Please specify an amount.",
  "Same token": "Cannot swap the same token. Please select different tokens.",
  "Invalid path": "Invalid swap path. Please try again.",
  "Path too long": "Swap path is too long. Please try a simpler route.",
  "Path not found": "No swap path found. Please try different tokens.",
  // Validation Errors
  "recipient address is required":
    "Recipient address is required. Please enter the recipient's wallet address.",
  "amount must be greater than 0": "Please enter an amount greater than 0.",
  "token chain id is required":
    "Network information is missing. Please select the correct network for this token.",
  "token address is required":
    "Token address is required. Please provide a token contract address.",
  "token decimals is required":
    "Token decimal is required. Please provide the correct token details.",
  "wallet not connected or chain not selected":
    "Wallet not connected or network not selected. Please connect your wallet and choose the correct network.",
  "fee rate unavailable":
    "Unable to calculate transaction fees. Please try again in a moment.",
  "missing exchange params":
    "Exchange parameters are missing. Please refresh the page and try again.",
  "exchange order failed":
    "Exchange order could not be completed. Please try again or contact support.",
  // Bitcoin / UTXO Errors
  "utxo fetch failed":
    "Unable to calculate transaction fees (UTXO). Please try again in a moment.",
  "psbt signing failed":
    "Bitcoin transaction signing failed (PSBT). Please try signing the transaction again.",
  "invalid signed psbt":
    "Invalid Bitcoin transaction signature (PSBT). Please sign the transaction again.",
  // EVM Additional Errors
  "has not been authorized by the user":
    "Wallet connection issue detected. Please disconnect and reconnect your wallet.",
  "fail swap, not enough fee":
    "Swap failed due to insufficient funds. Please ensure you have enough funds to complete the transaction.",
  "insufficient native currency sent":
    "Not enough native currency was sent with the transaction. Please check the required amount and try again.",
  "stack limit reached":
    "Stack limit reached. This might be due to complex operations or infinite loops. Please try again with a simpler operation.",
  "method handler crashed":
    "There is an error in the operation. Please try again.",
  "execution timeout":
    "Transaction took too long to execute. Please try again.",
  "filter not found": "Filter expired. Please try again.",
  "attempting to switch chain":
    "Unable to switch to the required network. Please manually switch networks in your wallet.",
  // Additional RPC Error Codes
  "-32009": "Debug requests are currently limited. Please try again later.",
  "-32010": "Transaction cost exceeds gas limit. Please increase gas limit.",
  "-32011":
    "Network connection error. Please check your connection and try again.",
  "-32015":
    "Smart contract execution failed. Please check your transaction parameters and try again.",
  "-32612": "Custom traces are not available.",
  "-32613": "Requested trace type not allowed.",
  LogRangeLimited:
    "Too many blocks requested at once (limit: 10,000). Please reduce the block range.",
  CustomTracesBlocked: "Custom traces are not available.",
  // ============================================
  // Layer 2 / Rollup Errors
  // ============================================
  "L2: insufficient balance":
    "Insufficient balance on Layer 2. Please bridge funds.",
  "L2: deposit pending": "Deposit to Layer 2 is still pending. Please wait.",
  "L2: withdrawal pending":
    "Withdrawal from Layer 2 is still pending. Please wait.",
  "L2: bridge error": "Bridge error occurred. Please try again.",
  "L2: not available":
    "Layer 2 feature is not available. Please try again later.",
  // ============================================
  // Staking / DeFi Protocol Errors
  // ============================================
  "Staking: insufficient balance": "Insufficient balance for staking.",
  "Staking: already staked": "You have already staked. Please unstake first.",
  "Staking: not staked": "You have not staked yet. Please stake first.",
  "Staking: locked":
    "Staking is locked. Please wait for the lock period to end.",
  "Staking: paused": "Staking is paused. Please try again later.",
  "Rewards: not available": "Rewards are not available yet. Please wait.",
  "Rewards: already claimed": "Rewards have already been claimed.",
  "Vesting: locked": "Tokens are still vesting. Please wait.",
  "Vesting: not started": "Vesting has not started yet. Please wait.",
  // ============================================
  // NFT / ERC721 Errors
  // ============================================
  "NFT: not owner": "You do not own this NFT.",
  "NFT: not approved": "NFT transfer is not approved. Please approve first.",
  "NFT: already minted": "This NFT has already been minted.",
  "NFT: minting paused": "NFT minting is paused. Please try again later.",
  "NFT: max supply reached": "Maximum supply reached. No more NFTs available.",
  "NFT: invalid token ID": "Invalid NFT token ID. Please check the token ID.",
  "NFT: not found": "NFT not found. Please check the token ID.",
  // ============================================
  // Multi-sig / Safe Errors
  // ============================================
  "Multisig: insufficient signatures":
    "Not enough signatures. More signatures required.",
  "Multisig: duplicate signature": "Duplicate signature detected.",
  "Multisig: invalid signature": "Invalid signature provided.",
  "Multisig: threshold not met": "Signature threshold not met.",
  "Multisig: owner not found": "Owner not found in the multisig wallet.",
  // ============================================
  // Oracle / Price Feed Errors
  // ============================================
  "Oracle: price not available":
    "Price data is not available. Please try again.",
  "Oracle: stale price": "Price data is stale. Please refresh.",
  "Oracle: price too old": "Price data is too old. Please refresh.",
  "Oracle: invalid price": "Invalid price data. Please try again.",
  // ============================================
  // Flash Loan Errors
  // ============================================
  "Flash loan: insufficient liquidity": "Not enough liquidity for flash loan.",
  "Flash loan: callback failed":
    "Flash loan callback failed. Please check your contract.",
  "Flash loan: not repaid": "Flash loan was not repaid. Please repay the loan.",
  "Flash loan: invalid amount":
    "Invalid flash loan amount. Please check your request.",

  // ============================================
  // Solidity Custom Error Selectors (Hex)
  // ============================================
  "0x08c379a0": "The transaction reverted with a reason string.",
  "0x4e487b71":
    "The transaction panicked (arithmetic overflow or division by zero).",
  "0x8baa579f": "Insufficient balance for this swap.",
  "0xf4844814":
    "Slippage error: The amount out is less than your minimum requirement.",
  "0x31a57e3b": "The deadline for this transaction has passed.",
};
