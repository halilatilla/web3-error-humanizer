import { afterEach, describe, expect, it } from "vitest";
import {
  addPattern,
  createHumanizer,
  humanizeError,
  resetCustomPatterns,
} from "./index";

describe("createHumanizer", () => {
  afterEach(() => {
    resetCustomPatterns();
  });
  it("keeps an isolated registry so custom patterns do not leak globally", () => {
    const humanizer = createHumanizer({
      patterns: {
        MY_DEX_ERROR: {
          message: "Instance-only slippage message.",
          category: "slippage",
        },
      },
      fallbackMessage: "Swap failed. Try again.",
    });

    expect(humanizer.humanize(new Error("MY_DEX_ERROR"))).toBe(
      "Instance-only slippage message."
    );
    expect(humanizer.classify(new Error("MY_DEX_ERROR"))).toBe("slippage");
    expect(humanizeError(new Error("MY_DEX_ERROR"))).toBe(
      "Transaction failed. Please try again."
    );
  });

  it("does not observe process-wide addPattern mutations", () => {
    const humanizer = createHumanizer();
    addPattern("GLOBAL_ONLY_PATTERN_888", "Global message.", "gas");

    expect(humanizeError(new Error("GLOBAL_ONLY_PATTERN_888"))).toBe(
      "Global message."
    );
    expect(
      humanizer.humanizeLocal(new Error("GLOBAL_ONLY_PATTERN_888"))
    ).toBeNull();
  });

  it("uses the instance fallback for unknown errors", () => {
    const humanizer = createHumanizer({
      fallbackMessage: "Swap failed. Try again.",
    });

    expect(humanizer.humanize(new Error("totally unknown xyz"))).toBe(
      "Swap failed. Try again."
    );
    expect(
      humanizer.humanizeDetailed(new Error("totally unknown xyz")).source
    ).toBe("fallback");
  });

  it("narrows protocol-specific codes when a chain is set", () => {
    const evm = createHumanizer({ chain: "evm" });
    const solana = createHumanizer({ chain: "solana" });

    expect(evm.classify(new Error("26"))).toBe("protocol_limit");
    expect(solana.classify(new Error("26"))).toBe("unknown");
    expect(solana.classify(new Error("0x1771"))).toBe("slippage");
    expect(solana.classify(new Error("ACTION_REJECTED"))).toBe(
      "user_rejection"
    );
  });

  it("accepts runtime patterns on the instance", () => {
    const humanizer = createHumanizer();
    humanizer.addPattern(
      "INSTANCE_ADDED_999",
      "Added after construction.",
      "bridge"
    );

    expect(humanizer.classify(new Error("INSTANCE_ADDED_999"))).toBe("bridge");
    expect(humanizeError(new Error("INSTANCE_ADDED_999"))).toBe(
      "Transaction failed. Please try again."
    );
  });
});
