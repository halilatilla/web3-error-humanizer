import { OpenAI } from "openai";
import { BaseError, ContractFunctionRevertedError } from "viem";

export interface HumanizerConfig {
  /**
   * OpenAI API key. Optional - if not provided, only local dictionary will be used.
   */
  openaiApiKey?: string;
  /**
   * AI model to use (default: gpt-4o-mini). Only used if openaiApiKey is provided.
   */
  aiModel?: string;
  /**
   * Fallback message when no local match and no AI available.
   * Default: "Transaction failed. Please try again."
   */
  fallbackMessage?: string;
}

export interface SwapContext {
  fromToken?: string;
  toToken?: string;
  amount?: string;
  slippage?: string;
  network?: string;
}

/**
 * Comprehensive error map covering:
 * - Ethers.js error codes
 * - MetaMask/EIP-1193 error codes
 * - Uniswap V2/V3 errors
 * - PancakeSwap errors
 * - SushiSwap errors
 * - Generic ERC20 errors
 * - Gas-related errors
 * - WalletConnect/Reown errors
 * - Network errors
 */
const LOCAL_ERROR_MAP: Record<string, string> = {
  // ============================================
  // User Actions / Wallet Rejections
  // ============================================
  ACTION_REJECTED: "The transaction was cancelled in your wallet.",
  USER_REJECTED: "You declined the request in your wallet.",
  "User rejected": "You declined the request in your wallet.",
  "User denied": "You declined the request in your wallet.",
  "user rejected transaction": "You cancelled the transaction in your wallet.",
  "user rejected signing": "You cancelled the signing request.",
  "Request rejected": "You declined the request in your wallet.",
  "4001": "You declined the request in your wallet.",
  "User cancelled": "You cancelled the transaction.",

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
  // RPC Errors (EIP-1193)
  // ============================================
  "-32700": "Invalid request format. Please try again.",
  "-32600": "Invalid request. Please try again.",
  "-32601": "Method not supported by your wallet.",
  "-32602": "Invalid parameters. Please check your inputs.",
  "-32603": "Internal error. Please try again.",
  "-32000": "Server error. Please try again.",
  "-32001": "Resource not found. Please try again.",
  "-32002": "Request already pending. Please wait.",
  "-32003": "Transaction rejected by the network.",
  "-32004": "Method not supported.",
  "-32005": "Request limit exceeded. Please wait and try again.",
  "4100": "Wallet is locked or the requested method is not authorized.",
  "4200": "This method is not supported by your wallet.",
  "4900": "Wallet is disconnected. Please reconnect.",
  "4901": "Wallet is connected to a different network. Please switch networks.",

  // ============================================
  // WalletConnect / Reown Errors
  // ============================================
  "Session expired": "Your session expired. Please reconnect your wallet.",
  "Session disconnected": "Wallet disconnected. Please reconnect.",
  "WalletConnect: User rejected": "You declined the request in your wallet.",
  "No matching key": "Session not found. Please reconnect your wallet.",
  "Pairing expired": "Connection expired. Please scan the QR code again.",

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
  // Miscellaneous
  // ============================================
  "Header not found": "Block not found. Please try again.",
  "Unknown block": "Block not found. The network may be syncing.",
  "pruned data": "Historical data not available. Try a different RPC.",
  "rate limit": "Too many requests. Please wait a moment and try again.",
  "Too Many Requests": "Rate limited. Please wait and try again.",
  exceeded: "Limit exceeded. Please try again later.",
  Forbidden: "Access denied. Please check your permissions.",
  Unauthorized: "Not authorized. Please reconnect your wallet.",
};

const DEFAULT_FALLBACK_MESSAGE = "Transaction failed. Please try again.";

/**
 * Extract raw message from complex Web3 error objects
 */
function extractRawMessage(error: unknown): string {
  if (error instanceof BaseError) {
    const revertError = error.walk(
      (err) => err instanceof ContractFunctionRevertedError
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      return revertError.reason || revertError.shortMessage || error.message;
    }
    return error.shortMessage || error.message;
  }

  // Ethers/Generic handling
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;

    // Check for error code (EIP-1193)
    if (typeof err.code === "number" || typeof err.code === "string") {
      const codeStr = String(err.code);
      if (LOCAL_ERROR_MAP[codeStr]) {
        return codeStr;
      }
    }

    if (typeof err.reason === "string") return err.reason;
    if (err.data && typeof err.data === "object") {
      const data = err.data as Record<string, unknown>;
      if (typeof data.message === "string") return data.message;
    }
    if (typeof err.message === "string") return err.message;
    if (typeof err.shortMessage === "string") return err.shortMessage;
  }

  return JSON.stringify(error);
}

/**
 * Match error message against local dictionary
 */
function matchLocalError(rawMessage: string): string | null {
  for (const [key, humanText] of Object.entries(LOCAL_ERROR_MAP)) {
    if (rawMessage.toLowerCase().includes(key.toLowerCase())) {
      return humanText;
    }
  }
  return null;
}

/**
 * Humanize error using ONLY the local dictionary (no API key needed).
 * Returns null if no match found.
 *
 * @example
 * const message = humanizeErrorLocal(error);
 * if (message) {
 *   showError(message);
 * } else {
 *   showError("Transaction failed");
 * }
 */
export function humanizeErrorLocal(error: unknown): string | null {
  const rawMessage = extractRawMessage(error);
  return matchLocalError(rawMessage);
}

/**
 * Humanize error using local dictionary with a fallback message.
 * No API key needed - completely free and instant.
 *
 * @example
 * const message = humanizeError(error);
 * showError(message); // Always returns a string
 */
export function humanizeError(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK_MESSAGE
): string {
  return humanizeErrorLocal(error) ?? fallback;
}

/**
 * Web3ErrorHumanizer class with optional AI fallback.
 *
 * @example
 * // Local-only mode (no API key needed)
 * const humanizer = new Web3ErrorHumanizer();
 * const message = await humanizer.humanize(error);
 *
 * @example
 * // With AI fallback
 * const humanizer = new Web3ErrorHumanizer({
 *   openaiApiKey: process.env.OPENAI_API_KEY
 * });
 * const message = await humanizer.humanize(error);
 */
export class Web3ErrorHumanizer {
  private openai: OpenAI | null = null;
  private model: string;
  private fallbackMessage: string;

  constructor(config: HumanizerConfig = {}) {
    // Only initialize OpenAI if API key is provided
    if (config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: config.openaiApiKey,
        dangerouslyAllowBrowser: true,
      });
    }
    this.model = config.aiModel || "gpt-4o-mini";
    this.fallbackMessage = config.fallbackMessage || DEFAULT_FALLBACK_MESSAGE;
  }

  /**
   * Check if AI fallback is enabled
   */
  get hasAI(): boolean {
    return this.openai !== null;
  }

  /**
   * Main method to humanize an error.
   * First checks local dictionary (free & instant).
   * Falls back to AI if available, otherwise returns fallback message.
   */
  async humanize(error: unknown, context?: SwapContext): Promise<string> {
    const rawMessage = extractRawMessage(error);

    // 1. Check Local Heuristics first (Fast & Free)
    const localMatch = matchLocalError(rawMessage);
    if (localMatch) return localMatch;

    // 2. Fallback to AI if available
    if (this.openai) {
      return await this.askAI(rawMessage, context);
    }

    // 3. No AI available, return fallback
    return this.fallbackMessage;
  }

  private async askAI(
    rawError: string,
    context?: SwapContext
  ): Promise<string> {
    if (!this.openai) {
      return this.fallbackMessage;
    }

    const prompt = `
      You are a Web3 UX expert. A user's DEX swap failed with a technical error. 
      Convert it into a friendly, helpful 1-sentence explanation.

      TECHNICAL ERROR: "${rawError}"
      CONTEXT: ${context ? JSON.stringify(context) : "No context provided"}

      RULES:
      - Do NOT use technical jargon like "reverted", "gas limit", "0x...", or "nonce".
      - Explain WHY it happened (e.g. low liquidity, price volatility, lack of funds).
      - Tell the user exactly what to do next.
      - Keep it under 20 words.
      
      Humanized Message:`;

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      });

      return (
        response.choices[0].message.content?.trim() || this.fallbackMessage
      );
    } catch {
      return this.fallbackMessage;
    }
  }
}

// Re-export the LOCAL_ERROR_MAP for testing and extension purposes
export { LOCAL_ERROR_MAP };

/**
 * Get the count of locally supported error patterns
 */
export function getLocalErrorCount(): number {
  return Object.keys(LOCAL_ERROR_MAP).length;
}
