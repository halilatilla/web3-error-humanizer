import { describe, expect, it } from "vitest";
import { CATEGORY_META } from "./data/category-meta";
import {
  addPattern,
  classifyError,
  getErrorSeverity,
  getSuggestion,
  humanizeError,
  humanizeErrorDetailed,
  humanizeErrorLocal,
  isRecoverable,
  LOCAL_ERROR_MAP,
  resetCustomPatterns,
} from "./index";

describe("standalone API helpers", () => {
  it("humanizes known errors and preserves fallback behavior", () => {
    expect(humanizeError(new Error("INSUFFICIENT_FUNDS"))).toBe(
      LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]
    );
    expect(humanizeError(new Error("Xyz123 completely unknown error"))).toBe(
      "Transaction failed. Please try again."
    );
    expect(
      humanizeError(
        new Error("Xyz123 completely unknown error"),
        "Custom message"
      )
    ).toBe("Custom message");
  });

  it("returns null for unknown local-only matches", () => {
    expect(humanizeErrorLocal(new Error("UniswapV2: K"))).toBe(
      LOCAL_ERROR_MAP["UniswapV2: K"]
    );
    expect(
      humanizeErrorLocal(new Error("Xyz123 completely unknown error"))
    ).toBeNull();
  });

  it("returns enriched metadata for local and fallback cases", () => {
    const localResult = humanizeErrorDetailed(new Error("ACTION_REJECTED"));
    expect(localResult.source).toBe("local");
    expect(localResult.matchedKey).toBe("ACTION_REJECTED");
    expect(localResult.category).toBe("user_rejection");
    expect(localResult.severity).toBe("info");
    expect(localResult.suggestion).toBe(
      CATEGORY_META.user_rejection.suggestion
    );

    const fallbackResult = humanizeErrorDetailed(
      new Error("Completely unknown failure 999"),
      "Fallback test"
    );
    expect(fallbackResult.source).toBe("fallback");
    expect(fallbackResult.category).toBe("unknown");
    expect(fallbackResult.message).toBe("Fallback test");
    expect(fallbackResult.recoverable).toBe(false);
  });

  it("classifies representative categories correctly", () => {
    const cases = [
      ["ACTION_REJECTED", "user_rejection"],
      ["INSUFFICIENT_FUNDS", "insufficient_funds"],
      ["INSUFFICIENT_OUTPUT_AMOUNT", "slippage"],
      ["out of gas", "gas"],
      ["NETWORK_ERROR", "network"],
      ["ERC20: insufficient allowance", "insufficient_allowance"],
      ["TIMEOUT", "timeout"],
      ["SwitchChainError", "chain_mismatch"],
      ["LayerZero: LzTokenUnavailable", "bridge"],
      ["SupplyCapExceeded", "protocol_limit"],
      ["WalletNotConnectedError", "wallet_connection"],
      ["MissingRequiredSignature", "signature"],
      ["execution reverted", "contract_error"],
    ] as const;

    for (const [message, category] of cases) {
      expect(classifyError(new Error(message))).toBe(category);
    }

    expect(classifyError({ code: 4001, message: "rejected" })).toBe(
      "user_rejection"
    );
    expect(classifyError({ code: -32603, message: "internal" })).toBe(
      "network"
    );
    expect(classifyError(new Error("Xyz random gibberish 99"))).toBe("unknown");
  });

  it("derives recoverability, suggestion, and severity from category metadata", () => {
    expect(isRecoverable(new Error("ACTION_REJECTED"))).toBe(true);
    expect(isRecoverable(new Error("execution reverted"))).toBe(false);
    expect(getSuggestion(new Error("INSUFFICIENT_FUNDS"))).toBe(
      CATEGORY_META.insufficient_funds.suggestion
    );
    expect(getSuggestion(new Error("Xyz random gibberish 99"))).toBe(
      CATEGORY_META.unknown.suggestion
    );
    expect(getErrorSeverity(new Error("ACTION_REJECTED"))).toBe("info");
    expect(getErrorSeverity(new Error("INSUFFICIENT_OUTPUT_AMOUNT"))).toBe(
      "warning"
    );
    expect(getErrorSeverity(new Error("NETWORK_ERROR"))).toBe("error");
  });

  it("falls back to the unknown category when custom patterns use invalid runtime categories", () => {
    resetCustomPatterns();
    addPattern(
      "TEST_INVALID_CATEGORY",
      "Invalid category pattern.",
      "not_a_real_category" as never
    );

    const result = humanizeErrorDetailed(new Error("TEST_INVALID_CATEGORY"));
    expect(result.message).toBe("Invalid category pattern.");
    expect(result.category).toBe("unknown");
    expect(result.severity).toBe(CATEGORY_META.unknown.severity);

    resetCustomPatterns();
  });
});
