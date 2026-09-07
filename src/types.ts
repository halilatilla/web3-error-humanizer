export type ErrorCategory =
  | "user_rejection"
  | "insufficient_funds"
  | "insufficient_allowance"
  | "slippage"
  | "liquidity"
  | "gas"
  | "nonce"
  | "network"
  | "contract_error"
  | "timeout"
  | "wallet_connection"
  | "chain_mismatch"
  | "protocol_limit"
  | "signature"
  | "bridge"
  | "unknown";

export type HumanizerChain =
  | "evm"
  | "solana"
  | "tron"
  | "ton"
  | "sui"
  | "btc"
  | "stellar";

export type ErrorSeverity = "error" | "warning" | "info";

export interface CategoryMeta {
  severity: ErrorSeverity;
  recoverable: boolean;
  suggestion: string;
}

export interface CategorizedPattern {
  message: string;
  category: ErrorCategory;
  chain?: HumanizerChain;
}

export interface HumanizerConfig {
  openaiApiKey?: string;
  aiModel?: string;
  fallbackMessage?: string;
}

export interface SwapContext {
  fromToken?: string;
  toToken?: string;
  amount?: string;
  slippage?: string;
  network?: string;
}

export type HumanizeSource = "local" | "ai" | "fallback";

export interface HumanizedResult {
  message: string;
  source: HumanizeSource;
  category: ErrorCategory;
  severity: ErrorSeverity;
  suggestion: string;
  recoverable: boolean;
  matchedKey?: string;
  rawMessage: string;
  code?: string;
}

export type LocalErrorEntry = {
  key: string;
  keyLower: string;
  message: string;
  category: ErrorCategory;
  isCode: boolean;
  isShortToken: boolean;
  isHexCode: boolean;
  exactOnly: boolean;
  chain?: HumanizerChain;
};

export interface CreateHumanizerOptions {
  chain?: HumanizerChain;
  patterns?: Record<
    string,
    string | { message: string; category?: ErrorCategory }
  >;
  fallbackMessage?: string;
}
