import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  type HumanizerConfig,
  LOCAL_ERROR_MAP,
  type SwapContext,
  Web3ErrorHumanizer,
  getLocalErrorCount,
  getLocalPatterns,
  hasLocalPattern,
  humanizeError,
  humanizeErrorDetailed,
  humanizeErrorLocal,
} from "./index";

// Mock OpenAI
const mockCreate = vi.fn().mockResolvedValue({
  choices: [{ message: { content: "AI generated response" } }],
});

vi.mock("openai", () => {
  return {
    OpenAI: class MockOpenAI {
      chat = {
        completions: {
          create: mockCreate,
        },
      };
      constructor() {}
    },
  };
});

describe("Web3ErrorHumanizer", () => {
  let humanizer: Web3ErrorHumanizer;
  const mockConfig: HumanizerConfig = {
    openaiApiKey: "test-api-key",
    aiModel: "gpt-4o-mini",
  };

  beforeEach(() => {
    mockCreate.mockClear();
    humanizer = new Web3ErrorHumanizer(mockConfig);
  });

  describe("Local Dictionary Matching", () => {
    it("should return local message for INSUFFICIENT_FUNDS error", async () => {
      const error = new Error("INSUFFICIENT_FUNDS");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
    });

    it("should return local message for ACTION_REJECTED error", async () => {
      const error = new Error("User ACTION_REJECTED the transaction");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["ACTION_REJECTED"]);
    });

    it("should return local message for EXPIRED error", async () => {
      const error = new Error("Transaction EXPIRED");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["EXPIRED"]);
    });

    it("should return local message for INSUFFICIENT_OUTPUT_AMOUNT error", async () => {
      const error = new Error("INSUFFICIENT_OUTPUT_AMOUNT");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_OUTPUT_AMOUNT"]);
    });

    it("should return local message for TRANSFER_FROM_FAILED error", async () => {
      const error = new Error("TRANSFER_FROM_FAILED");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["TRANSFER_FROM_FAILED"]);
    });

    it("should return local message for Pancake: K error", async () => {
      const error = new Error("Pancake: K");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Pancake: K"]);
    });

    it("should match case-insensitively", async () => {
      const error = new Error("insufficient_funds");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
    });
  });

  describe("Uniswap Errors", () => {
    it("should handle UniswapV2: K error", async () => {
      const error = new Error("UniswapV2: K");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["UniswapV2: K"]);
    });

    it("should handle UniswapV2Router: EXPIRED error", async () => {
      const error = new Error("UniswapV2Router: EXPIRED");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["UniswapV2Router: EXPIRED"]);
    });

    it("should handle UniswapV2: LOCKED error", async () => {
      const error = new Error("UniswapV2: LOCKED");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["UniswapV2: LOCKED"]);
    });
  });

  describe("ERC20 Errors", () => {
    it("should handle insufficient allowance error", async () => {
      const error = new Error("ERC20: insufficient allowance");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["ERC20: insufficient allowance"]);
    });

    it("should handle transfer amount exceeds balance", async () => {
      const error = new Error("transfer amount exceeds balance");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["transfer amount exceeds balance"]);
    });
  });

  describe("RPC Error Codes", () => {
    it("should handle EIP-1193 error code 4001 (user rejected)", async () => {
      const error = { code: 4001, message: "User rejected the request" };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["4001"]);
    });

    it("should handle error code -32603 (internal error)", async () => {
      const error = { code: -32603, message: "Internal JSON-RPC error" };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["-32603"]);
    });

    it("should handle error code 4900 (disconnected)", async () => {
      const error = { code: 4900, message: "Disconnected" };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["4900"]);
    });
  });

  describe("Gas Errors", () => {
    it("should handle gas required exceeds allowance", async () => {
      const error = new Error("gas required exceeds allowance");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["gas required exceeds allowance"]);
    });

    it("should handle out of gas error", async () => {
      const error = new Error("out of gas");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["out of gas"]);
    });

    it("should handle replacement transaction underpriced", async () => {
      const error = new Error("replacement transaction underpriced");
      const result = await humanizer.humanize(error);
      expect(result).toBe(
        LOCAL_ERROR_MAP["replacement transaction underpriced"]
      );
    });
  });

  describe("Network Errors", () => {
    it("should handle NETWORK_ERROR", async () => {
      const error = new Error("NETWORK_ERROR occurred");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["NETWORK_ERROR"]);
    });

    it("should handle timeout errors", async () => {
      const error = new Error("Request TIMEOUT");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["TIMEOUT"]);
    });
  });

  describe("WalletConnect/Reown Errors", () => {
    it("should handle session disconnected", async () => {
      const error = new Error("Session disconnected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Session disconnected"]);
    });

    it("should handle APKT006 (session expired code)", async () => {
      const error = new Error("Error: APKT006");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["APKT006"]);
    });

    it("should handle USER_REJECTED", async () => {
      const error = new Error("USER_REJECTED");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["USER_REJECTED"]);
    });
  });

  describe("Solana/Phantom Wallet Errors", () => {
    it("should handle WalletNotConnectedError", async () => {
      const error = new Error("WalletNotConnectedError");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["WalletNotConnectedError"]);
    });

    it("should handle WalletSignTransactionError", async () => {
      const error = new Error("WalletSignTransactionError");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["WalletSignTransactionError"]);
    });

    it("should handle Phantom rejection", async () => {
      const error = new Error("Phantom - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Phantom - Rejected"]);
    });

    it("should handle insufficient SOL", async () => {
      const error = new Error("Insufficient SOL for transaction");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Insufficient SOL"]);
    });
  });

  describe("TON/TonConnect Wallet Errors", () => {
    it("should handle USER_REJECTS_ERROR", async () => {
      const error = new Error("USER_REJECTS_ERROR");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["USER_REJECTS_ERROR"]);
    });

    it("should handle Tonkeeper rejection", async () => {
      const error = new Error("Tonkeeper - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Tonkeeper - Rejected"]);
    });

    it("should handle Not enough TON", async () => {
      const error = new Error("Not enough TON");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Not enough TON"]);
    });
  });

  describe("Tron/TronLink Wallet Errors", () => {
    it("should handle TronLink rejection", async () => {
      const error = new Error("TronLink - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["TronLink - Rejected"]);
    });

    it("should handle bandwidth error", async () => {
      const error = new Error("BANDWIDTH error occurred");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["BANDWIDTH"]);
    });

    it("should handle energy error", async () => {
      const error = new Error("ENERGY insufficient");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["ENERGY"]);
    });
  });

  describe("Sui Wallet Errors", () => {
    it("should handle Sui wallet connection error", async () => {
      const error = new Error("WALLET.CONNECT_ERROR");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["WALLET.CONNECT_ERROR"]);
    });

    it("should handle InsufficientGas", async () => {
      const error = new Error("InsufficientGas for transaction");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["InsufficientGas"]);
    });

    it("should handle Suiet rejection", async () => {
      const error = new Error("Suiet - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Suiet - Rejected"]);
    });
  });

  describe("Aptos Wallet Errors", () => {
    it("should handle Petra rejection", async () => {
      const error = new Error("Petra - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Petra - Rejected"]);
    });

    it("should handle SEQUENCE_NUMBER_TOO_OLD", async () => {
      const error = new Error("SEQUENCE_NUMBER_TOO_OLD");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["SEQUENCE_NUMBER_TOO_OLD"]);
    });

    it("should handle Aptos TRANSACTION_EXPIRED", async () => {
      // Use exact match to avoid triggering generic "EXPIRED" pattern
      const error = new Error("Aptos: TRANSACTION_EXPIRED");
      const result = await humanizer.humanize(error);
      expect(result).toContain("expired");
    });
  });

  describe("Hardware Wallet Errors", () => {
    it("should handle Ledger device error", async () => {
      const error = new Error("Ledger device not found");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Ledger device"]);
    });

    it("should handle Ledger locked", async () => {
      const error = new Error("Ledger locked");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Ledger locked"]);
    });

    it("should handle Trezor cancellation", async () => {
      const error = new Error("Trezor: Action cancelled");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Trezor: Action cancelled"]);
    });
  });

  describe("Other Wallet Errors", () => {
    it("should handle Coinbase Wallet rejection", async () => {
      const error = new Error("Coinbase Wallet - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Coinbase Wallet - Rejected"]);
    });

    it("should handle Trust Wallet rejection", async () => {
      const error = new Error("Trust Wallet - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Trust Wallet - Rejected"]);
    });

    it("should handle Rainbow rejection", async () => {
      const error = new Error("Rainbow - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Rainbow - Rejected"]);
    });

    it("should handle Rabby rejection", async () => {
      const error = new Error("Rabby - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Rabby - Rejected"]);
    });

    it("should handle Keplr rejection", async () => {
      const error = new Error("Keplr - Rejected");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["Keplr - Rejected"]);
    });
  });

  describe("Error Message Extraction", () => {
    it("should extract message from standard Error object", async () => {
      const error = new Error("INSUFFICIENT_FUNDS: not enough ETH");
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
    });

    it("should extract reason from ethers-style error", async () => {
      const error = { reason: "INSUFFICIENT_FUNDS" };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
    });

    it("should extract message from nested data object", async () => {
      const error = { data: { message: "INSUFFICIENT_OUTPUT_AMOUNT" } };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_OUTPUT_AMOUNT"]);
    });

    it("should handle null/undefined gracefully with AI", async () => {
      const result = await humanizer.humanize(null);
      expect(result).toBe("AI generated response");
    });
  });

  describe("AI Fallback", () => {
    it("should call AI for unrecognized errors", async () => {
      const error = new Error("Zx9Qw7Pm custom blockchain specific error");
      const result = await humanizer.humanize(error);
      expect(result).toBe("AI generated response");
    });

    it("should pass context to AI", async () => {
      const error = new Error("Abc123xyz novel error type");
      const context: SwapContext = {
        fromToken: "USDC",
        toToken: "ETH",
        slippage: "0.5%",
      };
      const result = await humanizer.humanize(error, context);
      expect(result).toBe("AI generated response");
    });
  });

  describe("humanizeDetailed (class)", () => {
    it("should return source=local when matched", async () => {
      const error = new Error("INSUFFICIENT_FUNDS");
      const result = await humanizer.humanizeDetailed(error);
      expect(result.source).toBe("local");
      expect(result.matchedKey).toBe("INSUFFICIENT_FUNDS");
      expect(result.message).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
      expect(result.rawMessage).toContain("INSUFFICIENT_FUNDS");
    });

    it("should return source=ai when no local match and AI enabled", async () => {
      const error = new Error("Unrecognized error code 12345");
      const result = await humanizer.humanizeDetailed(error);
      expect(result.source).toBe("ai");
      expect(result.message).toBe("AI generated response");
      expect(result.rawMessage).toContain("Unrecognized error code 12345");
    });
  });

  describe("Configuration", () => {
    it("should use default model when not specified", () => {
      const config: HumanizerConfig = { openaiApiKey: "test-key" };
      const h = new Web3ErrorHumanizer(config);
      expect(h).toBeInstanceOf(Web3ErrorHumanizer);
      expect(h.hasAI).toBe(true);
    });

    it("should allow custom AI model", () => {
      const config: HumanizerConfig = {
        openaiApiKey: "test-key",
        aiModel: "gpt-4-turbo",
      };
      const h = new Web3ErrorHumanizer(config);
      expect(h).toBeInstanceOf(Web3ErrorHumanizer);
    });
  });
});

describe("Web3ErrorHumanizer - Local Only Mode", () => {
  let humanizer: Web3ErrorHumanizer;

  beforeEach(() => {
    // Create without API key - local only mode
    humanizer = new Web3ErrorHumanizer();
  });

  it("should work without API key", () => {
    expect(humanizer).toBeInstanceOf(Web3ErrorHumanizer);
    expect(humanizer.hasAI).toBe(false);
  });

  it("should return local match without API key", async () => {
    const error = new Error("INSUFFICIENT_FUNDS");
    const result = await humanizer.humanize(error);
    expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
  });

  it("should return fallback for unknown errors without API key", async () => {
    const error = new Error("Xyz123 completely unknown error");
    const result = await humanizer.humanize(error);
    expect(result).toBe("Transaction failed. Please try again.");
  });

  it("should use custom fallback message", async () => {
    const customHumanizer = new Web3ErrorHumanizer({
      fallbackMessage: "Custom fallback message",
    });
    const error = new Error("Xyz123 completely unknown error");
    const result = await customHumanizer.humanize(error);
    expect(result).toBe("Custom fallback message");
  });

  it("should work with empty config object", async () => {
    const h = new Web3ErrorHumanizer({});
    const error = new Error("INSUFFICIENT_FUNDS");
    const result = await h.humanize(error);
    expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
  });
});

describe("humanizeError (standalone function)", () => {
  it("should return human message for known errors", () => {
    const error = new Error("INSUFFICIENT_FUNDS");
    const result = humanizeError(error);
    expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
  });

  it("should return default fallback for unknown errors", () => {
    const error = new Error("Xyz123 completely unknown error");
    const result = humanizeError(error);
    expect(result).toBe("Transaction failed. Please try again.");
  });

  it("should use custom fallback message", () => {
    const error = new Error("Xyz123 completely unknown error");
    const result = humanizeError(error, "Custom message");
    expect(result).toBe("Custom message");
  });

  it("should handle ethers-style errors", () => {
    const error = { reason: "ACTION_REJECTED" };
    const result = humanizeError(error);
    expect(result).toBe(LOCAL_ERROR_MAP["ACTION_REJECTED"]);
  });

  it("should handle error codes", () => {
    const error = { code: 4001, message: "User rejected" };
    const result = humanizeError(error);
    expect(result).toBe(LOCAL_ERROR_MAP["4001"]);
  });
});

describe("humanizeErrorLocal (standalone function)", () => {
  it("should return human message for known errors", () => {
    const error = new Error("INSUFFICIENT_FUNDS");
    const result = humanizeErrorLocal(error);
    expect(result).toBe(LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
  });

  it("should return null for unknown errors", () => {
    const error = new Error("Xyz123 completely unknown error");
    const result = humanizeErrorLocal(error);
    expect(result).toBeNull();
  });

  it("should handle Uniswap errors", () => {
    const error = new Error("UniswapV2: K");
    const result = humanizeErrorLocal(error);
    expect(result).toBe(LOCAL_ERROR_MAP["UniswapV2: K"]);
  });
});

describe("humanizeErrorDetailed (standalone function)", () => {
  it("should include metadata for local matches", () => {
    const error = new Error("ACTION_REJECTED");
    const result = humanizeErrorDetailed(error);
    expect(result.source).toBe("local");
    expect(result.matchedKey).toBe("ACTION_REJECTED");
    expect(result.message).toBe(LOCAL_ERROR_MAP["ACTION_REJECTED"]);
    expect(result.rawMessage.toLowerCase()).toContain("action_rejected");
  });

  it("should return fallback metadata when no local match", () => {
    const error = new Error("Completely unknown failure 999");
    const result = humanizeErrorDetailed(error, "Fallback test");
    expect(result.source).toBe("fallback");
    expect(result.matchedKey).toBeUndefined();
    expect(result.message).toBe("Fallback test");
    expect(result.rawMessage).toContain("Completely unknown failure 999");
  });
});

describe("LOCAL_ERROR_MAP", () => {
  it("should contain all expected error keys", () => {
    const expectedKeys = [
      "INSUFFICIENT_FUNDS",
      "ACTION_REJECTED",
      "EXPIRED",
      "INSUFFICIENT_OUTPUT_AMOUNT",
      "TRANSFER_FROM_FAILED",
      "Pancake: K",
      "UniswapV2: K",
      "UniswapV3: SPL",
      "insufficient allowance",
      "out of gas",
      "4001",
      "-32603",
      "NETWORK_ERROR",
      "Session expired",
    ];

    expectedKeys.forEach((key) => {
      expect(LOCAL_ERROR_MAP).toHaveProperty(key);
      expect(typeof LOCAL_ERROR_MAP[key]).toBe("string");
    });
  });

  it("should have user-friendly messages (no technical jargon)", () => {
    const technicalTerms = ["0x", "nonce", "wei", "gwei", "calldata"];

    Object.values(LOCAL_ERROR_MAP).forEach((message) => {
      technicalTerms.forEach((term) => {
        expect(message.toLowerCase()).not.toContain(term.toLowerCase());
      });
    });
  });

  it("should have at least 200 error patterns", () => {
    const count = Object.keys(LOCAL_ERROR_MAP).length;
    expect(count).toBeGreaterThanOrEqual(200);
  });
});

describe("getLocalErrorCount", () => {
  it("should return the correct count of error patterns", () => {
    const count = getLocalErrorCount();
    expect(count).toBe(Object.keys(LOCAL_ERROR_MAP).length);
    expect(count).toBeGreaterThanOrEqual(200);
  });
});

describe("hasLocalPattern", () => {
  it("should return true for existing patterns", () => {
    expect(hasLocalPattern("INSUFFICIENT_FUNDS")).toBe(true);
    expect(hasLocalPattern("ACTION_REJECTED")).toBe(true);
    expect(hasLocalPattern("4001")).toBe(true);
  });

  it("should return false for non-existing patterns", () => {
    expect(hasLocalPattern("RANDOM_NONEXISTENT_ERROR")).toBe(false);
    expect(hasLocalPattern("")).toBe(false);
  });
});

describe("getLocalPatterns", () => {
  it("should return an array of all pattern keys", () => {
    const patterns = getLocalPatterns();
    expect(Array.isArray(patterns)).toBe(true);
    expect(patterns.length).toBe(getLocalErrorCount());
    expect(patterns).toContain("INSUFFICIENT_FUNDS");
    expect(patterns).toContain("ACTION_REJECTED");
  });
});
