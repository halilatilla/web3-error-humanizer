import { afterEach, describe, expect, it } from "vitest";
import {
  addPattern,
  classifyError,
  humanizeError,
  humanizeErrorDetailed,
  resetCustomPatterns,
} from "./index";

describe("scored matching", () => {
  afterEach(() => {
    resetCustomPatterns();
  });

  it("prefers user rejection over a longer MetaMask signature substring", () => {
    const result = humanizeErrorDetailed(
      new Error("MetaMask Tx Signature: User denied transaction signature.")
    );

    expect(result.category).toBe("user_rejection");
    expect(result.source).toBe("local");
  });

  it("does not treat a generic revert word as a known contract error", () => {
    const result = humanizeErrorDetailed(
      new Error("Something reverted unexpectedly")
    );

    expect(result.source).toBe("fallback");
    expect(result.category).toBe("unknown");
    expect(result.matchedKey).toBeUndefined();
  });

  it("matches embedded JSON-RPC codes as tokens", () => {
    const result = humanizeErrorDetailed(
      new Error("JSON-RPC error -32603 internal error")
    );

    expect(result.source).toBe("local");
    expect(result.category).toBe("network");
    expect(result.matchedKey).toBe("-32603");
    expect(result.code).toBe("-32603");
  });

  it("does not treat a WalletConnect session id as Li.Fi 1001 or bare TIMEOUT", () => {
    const result = humanizeErrorDetailed(
      new Error("WalletConnect session topic 1001 timeout")
    );

    expect(result.matchedKey).not.toBe("1001");
    expect(result.matchedKey).not.toBe("TIMEOUT");
    expect(result.category).not.toBe("bridge");
  });

  it("still matches an exact TIMEOUT token", () => {
    expect(classifyError(new Error("TIMEOUT"))).toBe("timeout");
  });

  it("classifies liquidity errors as liquidity, not slippage", () => {
    expect(classifyError(new Error("INSUFFICIENT_LIQUIDITY"))).toBe(
      "liquidity"
    );
  });

  it("matches Houdini-style wallet broadcast and denial phrases", () => {
    expect(
      classifyError(new Error("Transaction was not broadcast to the network"))
    ).toBe("network");
    expect(classifyError(new Error("User denied transaction signature."))).toBe(
      "user_rejection"
    );
  });

  it("classifies harvest catalog keys", () => {
    expect(classifyError({ code: 4902 })).toBe("chain_mismatch");
    expect(humanizeErrorDetailed({ code: 4902 }).matchedKey).toBe("4902");

    expect(
      humanizeErrorDetailed(new Error("UniswapV2Router: INVALID_PATH")).category
    ).toBe("contract_error");
    expect(
      classifyError(new Error("UniswapV2Router: INSUFFICIENT_A_AMOUNT"))
    ).toBe("slippage");
    expect(
      classifyError(new Error("UniswapV2Router: INSUFFICIENT_B_AMOUNT"))
    ).toBe("slippage");

    expect(classifyError(new Error("UNPREDICTABLE_GAS_LIMIT"))).toBe("gas");
    expect(classifyError(new Error("NonceTooLowError"))).toBe("nonce");
    expect(classifyError(new Error("FeeCapTooLowError"))).toBe("gas");
    expect(classifyError(new Error("InsufficientFundsError"))).toBe(
      "insufficient_funds"
    );
    expect(classifyError(new Error("InsufficientFundsForFee"))).toBe(
      "insufficient_funds"
    );
  });

  it("rebuilds the index when custom patterns are reset", () => {
    addPattern("ZZZ_CUSTOM_RESET_TEST", "Custom reset message.", "slippage");

    expect(humanizeError(new Error("ZZZ_CUSTOM_RESET_TEST"))).toBe(
      "Custom reset message."
    );

    resetCustomPatterns();

    expect(humanizeError(new Error("ZZZ_CUSTOM_RESET_TEST"))).toBe(
      "Transaction failed. Please try again."
    );
  });
});
