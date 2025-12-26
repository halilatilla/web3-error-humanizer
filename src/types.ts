import { OpenAI } from "openai";

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

export type HumanizeSource = "local" | "ai" | "fallback";

export interface HumanizedResult {
  /**
   * Human-readable message
   */
  message: string;
  /**
   * Where the message came from
   */
  source: HumanizeSource;
  /**
   * The matched local error key (when source === "local")
   */
  matchedKey?: string;
  /**
   * The extracted raw error message
   */
  rawMessage: string;
}

export type LocalErrorEntry = {
  key: string;
  keyLower: string;
  message: string;
  isCode: boolean;
  isShortToken: boolean;
};
