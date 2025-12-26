import { OpenAI } from "openai";
import { BaseError, ContractFunctionRevertedError } from "viem";

export interface HumanizerConfig {
  openaiApiKey: string;
  aiModel?: string;
  template?: string;
}

export interface SwapContext {
  fromToken?: string;
  toToken?: string;
  amount?: string;
  slippage?: string;
  network?: string;
}

const LOCAL_ERROR_MAP: Record<string, string> = {
  INSUFFICIENT_FUNDS:
    "You don't have enough gas (ETH/native token) to pay for this transaction.",
  ACTION_REJECTED: "The transaction was cancelled in your wallet.",
  EXPIRED:
    "The swap took too long to confirm. Please try again with a higher gas fee.",
  INSUFFICIENT_OUTPUT_AMOUNT:
    "Price moved too much. Try increasing your slippage tolerance.",
  TRANSFER_FROM_FAILED:
    "Token approval failed or you have insufficient balance of the token you are selling.",
  "Pancake: K": "Low liquidity for this pair. Try a smaller swap amount.",
};

export class Web3ErrorHumanizer {
  private openai: OpenAI;
  private model: string;

  constructor(config: HumanizerConfig) {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey,
      dangerouslyAllowBrowser: true, // Necessary if used in frontend directly
    });
    this.model = config.aiModel || "gpt-4o-mini";
  }

  /**
   * Main method to take a raw error and return a human message
   */
  async humanize(error: unknown, context?: SwapContext): Promise<string> {
    const rawMessage = this.extractRawMessage(error);

    // 1. Check Local Heuristics first (Fast & Free)
    for (const [key, humanText] of Object.entries(LOCAL_ERROR_MAP)) {
      if (rawMessage.includes(key)) return humanText;
    }

    // 2. Fallback to AI for complex reverts
    return await this.askAI(rawMessage, context);
  }

  /**
   * Utility to pull the most relevant string out of complex Web3 error objects
   */
  private extractRawMessage(error: unknown): string {
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
      if (typeof err.reason === "string") return err.reason;
      if (err.data && typeof err.data === "object") {
        const data = err.data as Record<string, unknown>;
        if (typeof data.message === "string") return data.message;
      }
      if (typeof err.message === "string") return err.message;
    }

    return JSON.stringify(error);
  }

  private async askAI(
    rawError: string,
    context?: SwapContext
  ): Promise<string> {
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
        response.choices[0].message.content?.trim() ||
        "The transaction failed on-chain. Please check your settings."
      );
    } catch {
      return "Transaction failed. This usually happens due to rapid price changes or insufficient gas.";
    }
  }
}

// Re-export the LOCAL_ERROR_MAP for testing and extension purposes
export { LOCAL_ERROR_MAP };
