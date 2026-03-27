import type { CategorizedPattern } from "../types";

export const DEFAULT_FALLBACK_MESSAGE = "Transaction failed. Please try again.";

/**
 * Comprehensive error map covering:
 * - Ethers.js error codes
 * - MetaMask/EIP-1193/EIP-1474 error codes
 * - Viem error classes
 * - Phantom/Solana wallet & program errors
 * - TON/TonConnect errors
 * - Tron/TronLink errors
 * - Sui wallet errors
 * - Aptos wallet errors
 * - Uniswap V2/V3/V4 errors (incl. hooks & custom selectors)
 * - PancakeSwap / SushiSwap / Curve / Balancer / 1inch / KyberSwap errors
 * - Aave V3 numeric error codes
 * - Compound V3 (Comet) errors
 * - ERC-6093 standard custom errors (ERC-20/721/1155)
 * - ERC-4337 Account Abstraction errors
 * - WalletConnect v2 error codes
 * - Solidity panic codes & common selectors (hex)
 * - OpenZeppelin common errors (Ownable, AccessControl, Pausable)
 * - Gas, nonce, network, L2/rollup errors
 */
export const CATEGORIZED_PATTERNS: Record<string, CategorizedPattern> = {
  // ============================================
  // User Actions / Wallet Rejections (Generic)
  // ============================================
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
  // ============================================
  // Insufficient Funds / Balance Errors
  // ============================================
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
  // ============================================
  // Aave V3 / Lending Pool Errors (VL_*)
  // ============================================
  VL_BORROWING_NOT_ENABLED: {
    message: "Borrowing is disabled for this asset right now.",
    category: "protocol_limit",
  },
  VL_SUPPLY_CAP_EXCEEDED: {
    message:
      "Supply cap reached for this asset. Try a smaller deposit or wait.",
    category: "protocol_limit",
  },
  VL_BORROW_CAP_EXCEEDED: {
    message:
      "Borrow cap reached for this asset. Try a smaller amount or another asset.",
    category: "protocol_limit",
  },
  VL_COLLATERAL_CANNOT_COVER_NEW_BORROW: {
    message:
      "Not enough collateral for this borrow. Add more collateral or reduce amount.",
    category: "protocol_limit",
  },
  VL_HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD: {
    message: "Position is too risky. Add collateral or reduce your borrow.",
    category: "protocol_limit",
  },
  VL_COLLATERAL_BALANCE_IS_ZERO: {
    message:
      "You have no collateral for this position. Supply collateral first.",
    category: "protocol_limit",
  },
  VL_TRANSFER_NOT_ALLOWED: {
    message:
      "Transfer blocked because the asset is used as collateral or frozen.",
    category: "protocol_limit",
  },
  VL_INVALID_HEALTH_FACTOR: {
    message: "Health factor is invalid. Refresh your position and try again.",
    category: "protocol_limit",
  },
  VL_LIQUIDATION_CALL_FAILED: {
    message:
      "Liquidation could not be executed. Check position or try again later.",
    category: "protocol_limit",
  },
  SAFECAST_OVERFLOW: {
    message:
      "Internal math overflow. Try again with updated parameters or smaller size.",
    category: "protocol_limit",
  },
  // ============================================
  // Aave V3 Numeric Error Codes (Errors.sol)
  // ============================================
  "26": {
    message: "Amount must be greater than 0.",
    category: "protocol_limit",
  },
  "27": {
    message:
      "This reserve is currently inactive. Please try a different asset.",
    category: "protocol_limit",
  },
  "28": {
    message:
      "This reserve is frozen. You cannot perform this action right now.",
    category: "protocol_limit",
  },
  "29": {
    message: "This reserve is paused. Please try again later.",
    category: "protocol_limit",
  },
  "30": {
    message: "Borrowing is not enabled for this asset.",
    category: "protocol_limit",
  },
  "31": {
    message: "Stable borrowing is not enabled for this asset.",
    category: "protocol_limit",
  },
  "32": {
    message: "You cannot withdraw more than your available balance.",
    category: "protocol_limit",
  },
  "34": {
    message: "Your collateral balance is zero. Supply collateral first.",
    category: "protocol_limit",
  },
  "35": {
    message:
      "Your health factor is too low. Add collateral or repay some debt.",
    category: "protocol_limit",
  },
  "36": {
    message:
      "Not enough collateral to cover this borrow. Add more or reduce the amount.",
    category: "protocol_limit",
  },
  "39": {
    message: "You don't have debt of this type to repay.",
    category: "protocol_limit",
  },
  "45": {
    message:
      "This position cannot be liquidated — health factor is above threshold.",
    category: "protocol_limit",
  },
  "46": {
    message: "The selected collateral cannot be liquidated.",
    category: "protocol_limit",
  },
  "50": {
    message: "Borrow cap exceeded for this reserve. Try a smaller amount.",
    category: "protocol_limit",
  },
  "51": {
    message: "Supply cap exceeded for this reserve. Try a smaller deposit.",
    category: "protocol_limit",
  },
  "53": {
    message: "Debt ceiling exceeded for this asset.",
    category: "protocol_limit",
  },
  "57": {
    message:
      "Loan-to-value validation failed. Adjust your collateral or borrow amount.",
    category: "protocol_limit",
  },
  "59": {
    message:
      "Price oracle check failed. The market may be volatile — try again later.",
    category: "protocol_limit",
  },
  "60": {
    message: "This asset cannot be borrowed in isolation mode.",
    category: "protocol_limit",
  },
  "80": {
    message: "This operation is not supported by the protocol.",
    category: "protocol_limit",
  },
  "89": {
    message: "You cannot borrow multiple assets when using a siloed asset.",
    category: "protocol_limit",
  },
  "91": {
    message: "Flash loans are disabled for this asset.",
    category: "protocol_limit",
  },
  // ============================================
  // ERC-6093 Standard Custom Errors
  // ============================================
  ERC20InsufficientBalance: {
    message: "Your token balance is too low for this transaction.",
    category: "insufficient_funds",
  },
  ERC20InvalidSender: {
    message: "Invalid sender address for this token transaction.",
    category: "contract_error",
  },
  ERC20InvalidReceiver: {
    message: "Invalid recipient address for this token transaction.",
    category: "contract_error",
  },
  ERC20InsufficientAllowance: {
    message: "You need to approve more tokens before this transaction.",
    category: "insufficient_allowance",
  },
  ERC20InvalidApprover: {
    message: "Invalid address used for token approval.",
    category: "contract_error",
  },
  ERC20InvalidSpender: {
    message: "Invalid spender address for token approval.",
    category: "contract_error",
  },
  ERC721InvalidOwner: {
    message: "You do not own this NFT.",
    category: "contract_error",
  },
  ERC721NonexistentToken: {
    message: "This NFT does not exist.",
    category: "contract_error",
  },
  ERC721InvalidSender: {
    message: "You are not authorized to send this NFT.",
    category: "contract_error",
  },
  ERC721InvalidReceiver: {
    message: "Invalid recipient address for this NFT.",
    category: "contract_error",
  },
  ERC721InsufficientApproval: {
    message: "You need to approve this NFT transfer first.",
    category: "insufficient_allowance",
  },
  ERC721IncorrectOwner: {
    message: "The NFT is not owned by the expected address.",
    category: "contract_error",
  },
  ERC1155InsufficientBalance: {
    message: "You do not have enough of these tokens/NFTs.",
    category: "insufficient_funds",
  },
  ERC1155InvalidSender: {
    message: "You are not authorized to send these tokens.",
    category: "contract_error",
  },
  ERC1155InvalidReceiver: {
    message: "Invalid recipient address for these tokens.",
    category: "contract_error",
  },
  ERC1155MissingApprovalForAll: {
    message: "You need to set approval for all before this transfer.",
    category: "insufficient_allowance",
  },
  ERC1155InvalidArrayLength: {
    message: "Token IDs and amounts arrays must have the same length.",
    category: "contract_error",
  },
  ERC1155InsufficientApproval: {
    message: "You need to approve this transfer first.",
    category: "insufficient_allowance",
  },
  // ============================================
  // ERC-4337 EntryPoint Errors (Account Abstraction)
  // ============================================
  AA10: {
    message: "Account already exists. You cannot initialize it again.",
    category: "contract_error",
  },
  AA13: {
    message: "Wallet creation failed. Check if your factory has enough gas.",
    category: "gas",
  },
  AA20: {
    message:
      "Smart account not deployed yet. Please ensure the first transaction includes initCode.",
    category: "contract_error",
  },
  AA21: {
    message:
      "You don't have enough native tokens to pay for this transaction's gas.",
    category: "insufficient_funds",
  },
  AA23: {
    message:
      "Transaction validation failed. This usually means the signature is wrong or gas is too low.",
    category: "contract_error",
  },
  AA24: {
    message:
      "Signature error. Your wallet couldn't verify the transaction author.",
    category: "contract_error",
  },
  AA25: {
    message:
      "Transaction sequence error. Another transaction from this account might be pending.",
    category: "contract_error",
  },
  AA31: {
    message:
      "The gas sponsor (Paymaster) has run out of funds. Try again later.",
    category: "gas",
  },
  AA33: {
    message:
      "Gas sponsorship was rejected. You might not meet the sponsor's criteria.",
    category: "contract_error",
  },
  AA40: {
    message:
      "Transaction verification took too much gas. Try increasing the gas limit.",
    category: "gas",
  },
  AA51: {
    message:
      "Execution failed after validation. The smart contract logic reverted.",
    category: "contract_error",
  },
  // ============================================
  // Allowance / Approval Errors
  // ============================================
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
  // ============================================
  // Slippage / Price Impact Errors
  // ============================================
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
  // ============================================
  // Uniswap V2 Errors
  // ============================================
  "UniswapV2: K": {
    message: "Low liquidity for this pair. Try a smaller swap amount.",
    category: "liquidity",
  },
  "UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase your slippage tolerance.",
    category: "slippage",
  },
  "UniswapV2: INSUFFICIENT_INPUT_AMOUNT": {
    message: "Input amount is too small. Try a larger amount.",
    category: "slippage",
  },
  "UniswapV2: INSUFFICIENT_LIQUIDITY": {
    message: "Not enough liquidity for this swap. Try a smaller amount.",
    category: "liquidity",
  },
  "UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED": {
    message: "Not enough liquidity to remove. Try a smaller amount.",
    category: "liquidity",
  },
  "UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED": {
    message: "Insufficient liquidity to add. Try different amounts.",
    category: "liquidity",
  },
  "UniswapV2: EXPIRED": {
    message: "Quote expired. Please try the swap again.",
    category: "timeout",
  },
  "UniswapV2: INVALID_TO": {
    message: "Invalid recipient address for this swap.",
    category: "liquidity",
  },
  "UniswapV2: OVERFLOW": {
    message: "Amount too large. Try a smaller swap.",
    category: "liquidity",
  },
  "UniswapV2: LOCKED": {
    message: "This pair is currently locked. Try again shortly.",
    category: "liquidity",
  },
  "UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  "UniswapV2Router: EXCESSIVE_INPUT_AMOUNT": {
    message: "Price moved unfavorably. Increase slippage tolerance.",
    category: "slippage",
  },
  "UniswapV2Router: EXPIRED": {
    message: "Transaction expired. Please try again.",
    category: "timeout",
  },
  "UniswapV2Library: INSUFFICIENT_AMOUNT": {
    message: "Amount too small for this operation.",
    category: "liquidity",
  },
  "UniswapV2Library: INSUFFICIENT_LIQUIDITY": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  "UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT": {
    message: "Input amount too small. Try a larger amount.",
    category: "slippage",
  },
  "UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase slippage.",
    category: "slippage",
  },
  // ============================================
  // Uniswap V3 Errors
  // ============================================
  "UniswapV3: SPL": {
    message: "Price limit reached. Try a different price range.",
    category: "liquidity",
  },
  "UniswapV3: LOK": {
    message: "Pool is locked. Try again in a moment.",
    category: "liquidity",
  },
  "UniswapV3: TLU": {
    message: "Tick spacing error. Try a different price range.",
    category: "liquidity",
  },
  "UniswapV3: TLM": {
    message: "Tick limit reached. Adjust your price range.",
    category: "liquidity",
  },
  "UniswapV3: TUM": {
    message: "Tick upper limit reached.",
    category: "liquidity",
  },
  "UniswapV3: AI": {
    message: "Amount insufficient. Try a larger amount.",
    category: "liquidity",
  },
  "UniswapV3: M0": {
    message: "Not enough token0 liquidity.",
    category: "liquidity",
  },
  "UniswapV3: M1": {
    message: "Not enough token1 liquidity.",
    category: "liquidity",
  },
  "UniswapV3: AS": {
    message: "Amount specified is zero.",
    category: "liquidity",
  },
  "UniswapV3: IIA": {
    message: "Invalid amount specified.",
    category: "liquidity",
  },
  "UniswapV3: L": {
    message: "Liquidity error. Try different parameters.",
    category: "liquidity",
  },
  "UniswapV3: F0": {
    message: "Flash loan callback failed for token0.",
    category: "liquidity",
  },
  "UniswapV3: F1": {
    message: "Flash loan callback failed for token1.",
    category: "liquidity",
  },
  Old: {
    message: "Quote expired. Please refresh and try again.",
    category: "timeout",
  },
  // ============================================
  // Uniswap V4 / Hook Errors
  // ============================================
  "UniswapV4: LOK": {
    message: "The pool is locked. A hook might be preventing re-entry.",
    category: "liquidity",
  },
  "UniswapV4: TLU": {
    message:
      "Price range error. The lower limit is higher than the upper limit.",
    category: "liquidity",
  },
  "UniswapV4: SPL": {
    message: "Price limit reached. The trade would move the price too far.",
    category: "liquidity",
  },
  "UniswapV4: IIA": {
    message:
      "Insufficient input amount. The swap didn't send enough tokens to the pool.",
    category: "liquidity",
  },
  "UniswapV4: AS": {
    message: "The trade amount cannot be zero.",
    category: "liquidity",
  },
  "UniswapV4: M0": {
    message: "The pool doesn't have enough of the first token (Token0).",
    category: "liquidity",
  },
  "UniswapV4: M1": {
    message: "The pool doesn't have enough of the second token (Token1).",
    category: "liquidity",
  },
  HookReverted: {
    message:
      "A custom logic 'hook' attached to this pool failed. Try a different route.",
    category: "liquidity",
  },
  FeeTooHigh: {
    message:
      "The dynamic fee set by the pool's hook is too high for this trade.",
    category: "liquidity",
  },
  CurrencyNotSettled: {
    message:
      "Token balances were not settled after the swap. The transaction was rolled back.",
    category: "liquidity",
  },
  PoolNotInitialized: {
    message:
      "This pool has not been initialized yet. It needs to be created first.",
    category: "liquidity",
  },
  AlreadyUnlocked: {
    message: "The pool manager is already unlocked.",
    category: "liquidity",
  },
  ManagerLocked: {
    message: "The pool manager is locked. You need to call unlock first.",
    category: "liquidity",
  },
  TickSpacingTooLarge: {
    message: "The tick spacing is too large for this pool.",
    category: "liquidity",
  },
  TickSpacingTooSmall: {
    message: "The tick spacing is too small for this pool.",
    category: "liquidity",
  },
  CurrenciesOutOfOrderOrEqual: {
    message:
      "Token addresses are out of order or identical. Token0 must be less than Token1.",
    category: "liquidity",
  },
  SwapAmountCannotBeZero: {
    message: "The swap amount cannot be zero.",
    category: "liquidity",
  },
  HookAddressNotValid: {
    message: "The hook address does not match the required permission flags.",
    category: "liquidity",
  },
  InvalidHookResponse: {
    message: "The pool hook returned an invalid response.",
    category: "liquidity",
  },
  FailedHookCall: {
    message: "The call to the pool hook failed.",
    category: "liquidity",
  },
  HookDeltaExceedsSwapAmount: {
    message:
      "The hook is trying to take more tokens than the swap amount allows.",
    category: "liquidity",
  },
  PoolAlreadyInitialized: {
    message: "This pool has already been initialized.",
    category: "liquidity",
  },
  PriceLimitAlreadyExceeded: {
    message: "The current price already exceeds your specified limit.",
    category: "liquidity",
  },
  PriceLimitOutOfBounds: {
    message: "The price limit is out of the valid range.",
    category: "liquidity",
  },
  NoLiquidityToReceiveFees: {
    message: "There is no liquidity in this pool to receive fees.",
    category: "liquidity",
  },
  InvalidFeeForExactOut: {
    message: "This fee configuration does not support exact-output swaps.",
    category: "liquidity",
  },
  TicksMisordered: {
    message: "The lower tick must be less than the upper tick.",
    category: "liquidity",
  },
  TickLowerOutOfBounds: {
    message: "The lower tick is below the minimum allowed.",
    category: "liquidity",
  },
  TickUpperOutOfBounds: {
    message: "The upper tick is above the maximum allowed.",
    category: "liquidity",
  },
  TickLiquidityOverflow: {
    message: "Adding this liquidity would overflow the tick.",
    category: "liquidity",
  },
  InvalidTick: {
    message: "The specified tick value is invalid.",
    category: "liquidity",
  },
  InvalidSqrtPrice: {
    message: "The specified sqrt price is out of range.",
    category: "liquidity",
  },
  InvalidPriceOrLiquidity: {
    message: "Invalid price or liquidity parameters.",
    category: "liquidity",
  },
  NotEnoughLiquidity: {
    message: "Not enough liquidity in the pool to complete this swap.",
    category: "liquidity",
  },
  PriceOverflow: {
    message: "The calculated price overflowed. Try a smaller amount.",
    category: "liquidity",
  },
  TickMisaligned: {
    message: "The tick is not aligned with the pool's tick spacing.",
    category: "liquidity",
  },
  FeeTooLarge: {
    message: "The fee exceeds the maximum allowed value.",
    category: "liquidity",
  },
  CannotUpdateEmptyPosition: {
    message: "Cannot update an empty liquidity position. Add liquidity first.",
    category: "liquidity",
  },
  InvalidCaller: {
    message: "You are not authorized to call this function.",
    category: "liquidity",
  },
  // ============================================
  // PancakeSwap Errors
  // ============================================
  "Pancake: K": {
    message: "Low liquidity for this pair. Try a smaller swap amount.",
    category: "liquidity",
  },
  "Pancake: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  "Pancake: INSUFFICIENT_INPUT_AMOUNT": {
    message: "Input amount too small. Try a larger amount.",
    category: "slippage",
  },
  "Pancake: INSUFFICIENT_LIQUIDITY": {
    message: "Not enough liquidity. Try a smaller amount.",
    category: "liquidity",
  },
  "Pancake: EXPIRED": {
    message: "Quote expired. Please try the swap again.",
    category: "timeout",
  },
  "Pancake: TRANSFER_FAILED": {
    message: "Token transfer failed. Check your approval.",
    category: "liquidity",
  },
  "Pancake: LOCKED": {
    message: "Pool is currently locked. Try again shortly.",
    category: "liquidity",
  },
  "PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase slippage.",
    category: "slippage",
  },
  "PancakeRouter: EXCESSIVE_INPUT_AMOUNT": {
    message: "Price moved unfavorably. Increase slippage.",
    category: "slippage",
  },
  "PancakeRouter: EXPIRED": {
    message: "Transaction expired. Please try again.",
    category: "timeout",
  },
  "PancakeLibrary: INSUFFICIENT_AMOUNT": {
    message: "Amount too small for this operation.",
    category: "liquidity",
  },
  "PancakeLibrary: INSUFFICIENT_LIQUIDITY": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  // ============================================
  // SushiSwap Errors
  // ============================================
  "SushiSwap: K": {
    message: "Low liquidity. Try a smaller swap amount.",
    category: "liquidity",
  },
  "SushiSwap: INSUFFICIENT_OUTPUT_AMOUNT": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  "SushiSwap: INSUFFICIENT_LIQUIDITY": {
    message: "Not enough liquidity for this swap.",
    category: "liquidity",
  },
  "SushiSwap: EXPIRED": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  // ============================================
  // 1inch / Aggregator Errors
  // ============================================
  "1inch: minReturn": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  ReturnAmountIsNotEnough: {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  "Min return not reached": {
    message: "Minimum return not met. Increase your slippage tolerance.",
    category: "slippage",
  },
  "1inch: insufficient output amount": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "slippage",
  },
  "1inch: insufficient input amount": {
    message: "Input amount too small. Try a larger amount.",
    category: "slippage",
  },
  "1inch: insufficient liquidity": {
    message: "Not enough liquidity. Try a smaller amount.",
    category: "slippage",
  },
  "1inch: expired": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  "1inch: transfer failed": {
    message: "Token transfer failed. Check your approval.",
    category: "slippage",
  },
  "Curve: insufficient output": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "liquidity",
  },
  "Curve: insufficient input": {
    message: "Input amount too small. Try a larger amount.",
    category: "liquidity",
  },
  "Curve: insufficient liquidity": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  "Curve: expired": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  "Curve: slippage": {
    message: "Price moved beyond your slippage tolerance.",
    category: "liquidity",
  },
  "Curve: math error": {
    message: "Calculation error. Please try again.",
    category: "liquidity",
  },
  "Balancer: insufficient output": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "liquidity",
  },
  "Balancer: insufficient input": {
    message: "Input amount too small. Try a larger amount.",
    category: "liquidity",
  },
  "Balancer: insufficient liquidity": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  "Balancer: expired": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  "Balancer: paused": {
    message: "Pool is paused. Please try again later.",
    category: "protocol_limit",
  },
  "Balancer: swap disabled": {
    message: "Swap is disabled for this pool.",
    category: "protocol_limit",
  },
  "DODO: insufficient output": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "liquidity",
  },
  "DODO: insufficient input": {
    message: "Input amount too small. Try a larger amount.",
    category: "liquidity",
  },
  "DODO: insufficient liquidity": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  "DODO: expired": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  "KyberSwap: insufficient output": {
    message: "Price moved too much. Increase slippage tolerance.",
    category: "liquidity",
  },
  "KyberSwap: insufficient input": {
    message: "Input amount too small. Try a larger amount.",
    category: "liquidity",
  },
  "KyberSwap: insufficient liquidity": {
    message: "Not enough liquidity for this trade.",
    category: "liquidity",
  },
  "KyberSwap: expired": {
    message: "Quote expired. Please try again.",
    category: "timeout",
  },
  // ============================================
  // Compound V3 (Comet) Errors
  // ============================================
  Absurd: {
    message:
      "The operation produced an unreasonable result. Please check your inputs.",
    category: "protocol_limit",
  },
  BadAsset: {
    message: "Invalid asset. This token is not supported by the protocol.",
    category: "protocol_limit",
  },
  BadDecimals: {
    message: "Token decimal configuration is invalid.",
    category: "protocol_limit",
  },
  BadDiscount: {
    message: "Invalid discount factor for this asset.",
    category: "protocol_limit",
  },
  BadMinimum: {
    message: "The minimum amount is set incorrectly.",
    category: "protocol_limit",
  },
  BadPrice: {
    message: "The price feed returned an invalid or stale price.",
    category: "protocol_limit",
  },
  BorrowTooSmall: {
    message:
      "Borrow amount is too small. The minimum borrow amount was not met.",
    category: "protocol_limit",
  },
  BorrowCFTooLarge: {
    message: "Borrow collateral factor is too large for this configuration.",
    category: "protocol_limit",
  },
  InsufficientReserves: {
    message: "The protocol does not have enough reserves.",
    category: "protocol_limit",
  },
  LiquidateCFTooLarge: {
    message:
      "Liquidation collateral factor is too large for this configuration.",
    category: "protocol_limit",
  },
  NoSelfTransfer: {
    message: "You cannot transfer tokens to yourself.",
    category: "protocol_limit",
  },
  NotCollateralized: {
    message:
      "Your position is not sufficiently collateralized. Add more collateral.",
    category: "protocol_limit",
  },
  NotForSale: {
    message: "This collateral is not available for purchase.",
    category: "protocol_limit",
  },
  NotLiquidatable: {
    message: "This position cannot be liquidated — it is still healthy.",
    category: "protocol_limit",
  },
  ReentrantCallBlocked: {
    message: "Re-entrant call detected and blocked for security.",
    category: "protocol_limit",
  },
  SupplyCapExceeded: {
    message: "Supply cap exceeded for this asset. Try a smaller amount.",
    category: "protocol_limit",
  },
  TooManyAssets: {
    message: "Maximum number of collateral assets reached.",
    category: "protocol_limit",
  },
  TooMuchSlippage: {
    message: "Too much slippage. The price moved beyond the acceptable range.",
    category: "slippage",
  },
  TransferInFailed: {
    message:
      "Token transfer into the protocol failed. Check your approval and balance.",
    category: "protocol_limit",
  },
  TransferOutFailed: {
    message: "Token transfer from the protocol failed. Please try again.",
    category: "protocol_limit",
  },
  // ============================================
  // Gas Related Errors
  // ============================================
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
  // ============================================
  // Nonce Errors
  // ============================================
  NONCE_EXPIRED: {
    message: "Transaction outdated. Please refresh and try again.",
    category: "nonce",
  },
  "nonce too low": {
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
  // ============================================
  // Transaction Errors
  // ============================================
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
  // ============================================
  // Solidity Panic Codes (0x...)
  // ============================================
  "0x01": {
    message: "Assertion failed. Internal contract error.",
    category: "contract_error",
  },
  "0x11": {
    message:
      "Arithmetic error: Number too big or too small (overflow/underflow).",
    category: "contract_error",
  },
  "0x12": {
    message: "Division by zero error.",
    category: "contract_error",
  },
  "0x21": {
    message: "Invalid number conversion (enum conversion failed).",
    category: "contract_error",
  },
  "0x22": {
    message: "Data storage error (incorrectly encoded storage byte array).",
    category: "contract_error",
  },
  "0x31": {
    message: "Empty array pop error.",
    category: "contract_error",
  },
  "0x32": {
    message: "Array index out of bounds exception.",
    category: "contract_error",
  },
  "0x41": {
    message: "Memory allocation error (too much memory requested).",
    category: "contract_error",
  },
  "0x51": {
    message: "Internal function call error (zero-initialized variable).",
    category: "contract_error",
  },
  // ============================================
  // Network / Connection Errors
  // ============================================
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
  // ============================================
  // RPC Errors (EIP-1193 & EIP-1474)
  // ============================================
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
  "5000": {
    message: "User rejected the request.",
    category: "user_rejection",
  },
  "5001": {
    message: "Chain ID does not match.",
    category: "chain_mismatch",
  },
  // ============================================
  // WalletConnect v2 Error Codes
  // ============================================
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
  // ============================================
  // WalletConnect / Reown Errors
  // ============================================
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
  // ============================================
  // MetaMask Specific Errors
  // ============================================
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
  // ============================================
  // Phantom / Solana Wallet Errors
  // ============================================
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
  // ============================================
  // TON / TonConnect Errors
  // ============================================
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
  // ============================================
  // Tron / TronLink Errors
  // ============================================
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
  // ============================================
  // Sui Wallet Errors
  // ============================================
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
  // ============================================
  // Aptos Wallet Errors
  // ============================================
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
  // ============================================
  // Bitcoin / Ordinals Wallet Errors
  // ============================================
  "UniSat - Rejected": {
    message: "You declined the request in UniSat wallet.",
    category: "user_rejection",
  },
  "Xverse - Rejected": {
    message: "You declined the request in Xverse wallet.",
    category: "user_rejection",
  },
  "Leather - Rejected": {
    message: "You declined the request in Leather wallet.",
    category: "user_rejection",
  },
  "OKX Wallet - Rejected": {
    message: "You declined the request in OKX Wallet.",
    category: "user_rejection",
  },
  "Insufficient BTC": {
    message: "Not enough BTC for this transaction.",
    category: "insufficient_funds",
  },
  "Invalid PSBT": {
    message: "Invalid transaction format. Please try again.",
    category: "wallet_connection",
  },
  "UTXO not found": {
    message: "Transaction input not found. Please try again.",
    category: "wallet_connection",
  },
  // ============================================
  // Reown AppKit Error Codes
  // ============================================
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
  // ============================================
  // Token Specific Errors
  // ============================================
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
  // ============================================
  // Contract Interaction Errors
  // ============================================
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
  // ============================================
  // Permit / Signature Errors
  // ============================================
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
  // ============================================
  // MEV / Sandwich Attack Protection
  // ============================================
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
  // ============================================
  // Miscellaneous / Generic Errors
  // ============================================
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
  // ============================================
  // Cross-Chain / Bridge Errors
  // ============================================
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
  // ============================================
  // LayerZero / Messaging Bridges
  // ============================================
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
  // ============================================
  // Arbitrum Retryables
  // ============================================
  "retryable ticket expired": {
    message:
      "Arbitrum retryable expired. Re-send the transaction or re-create the ticket.",
    category: "timeout",
  },
  "insufficient submission cost": {
    message: "L1 submission cost too low. Increase max fee and retry.",
    category: "bridge",
  },
  "max gas too low": {
    message: "Not enough gas for L2 execution. Increase gas limit and retry.",
    category: "bridge",
  },
  "oversize data": {
    message:
      "Transaction data too large for Arbitrum. Reduce transaction size.",
    category: "bridge",
  },
  // ============================================
  // OP Stack / Optimism
  // ============================================
  "L2 execution failed": {
    message: "Execution failed on L2. Increase gas or check the contract call.",
    category: "bridge",
  },
  "fee too low to cover L1 data": {
    message:
      "Base fee too low to pay L1 data costs. Increase the fee and retry.",
    category: "bridge",
  },
  // ============================================
  // Ledger / Hardware Wallet Errors
  // ============================================
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
  // ============================================
  // Coinbase Wallet Errors
  // ============================================
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
  // ============================================
  // Trust Wallet Errors
  // ============================================
  "Trust Wallet - Rejected": {
    message: "You declined the request in Trust Wallet.",
    category: "user_rejection",
  },
  "Trust: User cancelled": {
    message: "You cancelled the request in Trust Wallet.",
    category: "user_rejection",
  },
  // ============================================
  // Rainbow Wallet Errors
  // ============================================
  "Rainbow - Rejected": {
    message: "You declined the request in Rainbow.",
    category: "user_rejection",
  },
  // ============================================
  // Rabby Wallet Errors
  // ============================================
  "Rabby - Rejected": {
    message: "You declined the request in Rabby.",
    category: "user_rejection",
  },
  "Rabby: User rejected": {
    message: "You declined the request in Rabby wallet.",
    category: "user_rejection",
  },
  // ============================================
  // Safe (Gnosis) Wallet Errors
  // ============================================
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
  // ============================================
  // Keplr / Cosmos Wallet Errors
  // ============================================
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
  // ============================================
  // Argent Wallet Errors
  // ============================================
  "Argent - Rejected": {
    message: "You declined the request in Argent.",
    category: "user_rejection",
  },
  "Guardian signature required": {
    message: "Your Argent guardian needs to approve this.",
    category: "user_rejection",
  },
  // ============================================
  // Frame Wallet Errors
  // ============================================
  "Frame - Rejected": {
    message: "You declined the request in Frame.",
    category: "user_rejection",
  },
  // ============================================
  // Zerion Wallet Errors
  // ============================================
  "Zerion - Rejected": {
    message: "You declined the request in Zerion.",
    category: "user_rejection",
  },
  // ============================================
  // Wallet Standard Errors
  // ============================================
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
  // ============================================
  // Staking / DeFi Protocol Errors
  // ============================================
  "Staking: insufficient balance": {
    message: "Insufficient balance for staking.",
    category: "insufficient_funds",
  },
  "Staking: already staked": {
    message: "You have already staked. Please unstake first.",
    category: "protocol_limit",
  },
  "Staking: not staked": {
    message: "You have not staked yet. Please stake first.",
    category: "protocol_limit",
  },
  "Staking: locked": {
    message: "Staking is locked. Please wait for the lock period to end.",
    category: "protocol_limit",
  },
  "Staking: paused": {
    message: "Staking is paused. Please try again later.",
    category: "protocol_limit",
  },
  "Rewards: not available": {
    message: "Rewards are not available yet. Please wait.",
    category: "protocol_limit",
  },
  "Rewards: already claimed": {
    message: "Rewards have already been claimed.",
    category: "protocol_limit",
  },
  "Vesting: locked": {
    message: "Tokens are still vesting. Please wait.",
    category: "protocol_limit",
  },
  "Vesting: not started": {
    message: "Vesting has not started yet. Please wait.",
    category: "protocol_limit",
  },
  // NFT / ERC721 Errors
  // ============================================
  "NFT: not owner": {
    message: "You do not own this NFT.",
    category: "contract_error",
  },
  "NFT: not approved": {
    message: "NFT transfer is not approved. Please approve first.",
    category: "insufficient_allowance",
  },
  "NFT: already minted": {
    message: "This NFT has already been minted.",
    category: "contract_error",
  },
  "NFT: minting paused": {
    message: "NFT minting is paused. Please try again later.",
    category: "protocol_limit",
  },
  "NFT: max supply reached": {
    message: "Maximum supply reached. No more NFTs available.",
    category: "contract_error",
  },
  "NFT: invalid token ID": {
    message: "Invalid NFT token ID. Please check the token ID.",
    category: "contract_error",
  },
  "NFT: not found": {
    message: "NFT not found. Please check the token ID.",
    category: "contract_error",
  },
  // Multi-sig / Safe Errors
  // ============================================
  "Multisig: insufficient signatures": {
    message: "Not enough signatures. More signatures required.",
    category: "signature",
  },
  "Multisig: duplicate signature": {
    message: "Duplicate signature detected.",
    category: "signature",
  },
  "Multisig: invalid signature": {
    message: "Invalid signature provided.",
    category: "signature",
  },
  "Multisig: threshold not met": {
    message: "Signature threshold not met.",
    category: "signature",
  },
  "Multisig: owner not found": {
    message: "Owner not found in the multisig wallet.",
    category: "signature",
  },
  // Oracle / Price Feed Errors
  // ============================================
  "Oracle: price not available": {
    message: "Price data is not available. Please try again.",
    category: "network",
  },
  "Oracle: stale price": {
    message: "Price data is stale. Please refresh.",
    category: "network",
  },
  "Oracle: price too old": {
    message: "Price data is too old. Please refresh.",
    category: "network",
  },
  "Oracle: invalid price": {
    message: "Invalid price data. Please try again.",
    category: "network",
  },
  // Flash Loan Errors
  // ============================================
  "Flash loan: insufficient liquidity": {
    message: "Not enough liquidity for flash loan.",
    category: "liquidity",
  },
  "Flash loan: callback failed": {
    message: "Flash loan callback failed. Please check your contract.",
    category: "liquidity",
  },
  "Flash loan: not repaid": {
    message: "Flash loan was not repaid. Please repay the loan.",
    category: "liquidity",
  },
  "Flash loan: invalid amount": {
    message: "Invalid flash loan amount. Please check your request.",
    category: "liquidity",
  },
  // ============================================
  // Solidity Custom Error Selectors (Hex)
  // ============================================
  "0x08c379a0": {
    message: "The transaction reverted with a reason string.",
    category: "contract_error",
  },
  "0x4e487b71": {
    message:
      "The transaction panicked (arithmetic overflow or division by zero).",
    category: "contract_error",
  },
  "0x8baa579f": {
    message: "Insufficient balance for this swap.",
    category: "insufficient_funds",
  },
  "0xf4844814": {
    message:
      "Slippage error: The amount out is less than your minimum requirement.",
    category: "slippage",
  },
  "0x31a57e3b": {
    message: "The deadline for this transaction has passed.",
    category: "timeout",
  },
  "0xe450d38c": {
    message: "Insufficient token balance (ERC-20).",
    category: "insufficient_funds",
  },
  "0xfb8f41b2": {
    message: "Insufficient token allowance (ERC-20). Please approve first.",
    category: "insufficient_allowance",
  },
  "0xf4d678b8": {
    message: "Insufficient balance for this operation.",
    category: "insufficient_funds",
  },
  "0x098fb561": {
    message: "Insufficient input amount. Try increasing your trade size.",
    category: "slippage",
  },
  "0x42301c23": {
    message: "Insufficient output amount. Try increasing slippage tolerance.",
    category: "slippage",
  },
  "0xbb55fd27": {
    message: "Insufficient liquidity in the pool.",
    category: "liquidity",
  },
  "0x203d82d8": {
    message: "Transaction deadline has expired. Please try again.",
    category: "timeout",
  },
  "0x5212cba1": {
    message:
      "Token balances were not settled after the operation (CurrencyNotSettled).",
    category: "contract_error",
  },
  "0x486aa307": {
    message: "This pool has not been initialized (PoolNotInitialized).",
    category: "contract_error",
  },
  "0xb02b5dc2": {
    message: "Tick spacing too large for this pool configuration.",
    category: "contract_error",
  },
  "0x16fe7696": {
    message: "Tick spacing too small for this pool configuration.",
    category: "contract_error",
  },
  "0xeaa6c6eb": {
    message: "Token addresses are out of order or identical.",
    category: "contract_error",
  },
  "0xbe8b8507": {
    message: "The swap amount cannot be zero.",
    category: "contract_error",
  },
  "0xe65af6a0": {
    message: "The hook address does not match required permission flags.",
    category: "contract_error",
  },
  "0x1e048e1d": {
    message: "The pool hook returned an invalid response.",
    category: "contract_error",
  },
  "0x36bc48c5": {
    message: "The call to the pool hook failed.",
    category: "contract_error",
  },
  "0xfa0b71d6": {
    message: "The hook is taking more tokens than the swap amount allows.",
    category: "contract_error",
  },
  "0xfc5bee12": {
    message: "The fee exceeds the maximum allowed value.",
    category: "contract_error",
  },
  "0xaefeb924": {
    message: "Cannot update an empty liquidity position.",
    category: "contract_error",
  },
  "0x8774be48": {
    message: "Reserves must be synced before this operation.",
    category: "contract_error",
  },
  "0xd4d8f3e6": {
    message: "The tick is not aligned with the pool's tick spacing.",
    category: "contract_error",
  },
  // ============================================
  // Solidity Panic Codes
  // ============================================
  "Panic(0x00)": {
    message: "Generic compiler panic. The transaction was reverted.",
    category: "contract_error",
  },
  "Panic(0x01)": {
    message: "Assertion failed in the smart contract.",
    category: "contract_error",
  },
  "Panic(0x11)": {
    message:
      "Arithmetic overflow or underflow. The calculation exceeded safe bounds.",
    category: "contract_error",
  },
  "Panic(0x12)": {
    message: "Division or modulo by zero.",
    category: "contract_error",
  },
  "Panic(0x21)": {
    message: "Converted a value that is too large or negative to an enum.",
    category: "contract_error",
  },
  "Panic(0x22)": {
    message: "Incorrectly encoded storage byte array.",
    category: "contract_error",
  },
  "Panic(0x31)": {
    message: "Called pop on an empty array.",
    category: "contract_error",
  },
  "Panic(0x32)": {
    message: "Array index is out of bounds.",
    category: "contract_error",
  },
  "Panic(0x41)": {
    message: "Too much memory was allocated.",
    category: "contract_error",
  },
  "Panic(0x51)": {
    message: "Called a zero-initialized internal function.",
    category: "contract_error",
  },
  // ============================================
  // Common DeFi Protocol Errors (Generic)
  // ============================================
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

/** Backward-compatible flat map (derived from CATEGORIZED_PATTERNS) */
export const LOCAL_ERROR_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORIZED_PATTERNS).map(([k, v]) => [k, v.message])
);
