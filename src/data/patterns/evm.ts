import type { CategorizedPattern } from "../../types";

export const evmPatterns: Record<string, CategorizedPattern> = {
  // Aave V3 / Lending Pool Errors (VL_*)
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
  // Aave V3 Numeric Error Codes (Errors.sol)
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
  // ERC-6093 Standard Custom Errors
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
  // ERC-4337 EntryPoint Errors (Account Abstraction)
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
  // Uniswap V2 Errors
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
  // Uniswap V3 Errors
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
  // Uniswap V4 / Hook Errors
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
  // PancakeSwap Errors
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
  // SushiSwap Errors
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
  // 1inch / Aggregator Errors
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
  // Compound V3 (Comet) Errors
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
  // Solidity Panic Codes (0x...)
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
  // Arbitrum Retryables
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
  // OP Stack / Optimism
  "L2 execution failed": {
    message: "Execution failed on L2. Increase gas or check the contract call.",
    category: "bridge",
  },
  "fee too low to cover L1 data": {
    message:
      "Base fee too low to pay L1 data costs. Increase the fee and retry.",
    category: "bridge",
  },
  // Staking / DeFi Protocol Errors
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
  // Solidity Custom Error Selectors (Hex)
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
  // Solidity Panic Codes
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
};
