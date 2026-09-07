import { afterEach, describe, expect, it } from "vitest";
import * as evm from "./entries/evm";
import * as solana from "./entries/solana";

describe("web3-error-humanizer/evm", () => {
  afterEach(() => {
    evm.resetCustomPatterns();
  });

  it("matches Uniswap and MetaMask keys", () => {
    expect(
      evm.humanizeErrorDetailed(new Error("UniswapV2Router: INVALID_PATH"))
        .category
    ).toBe("contract_error");
    expect(evm.classifyError({ code: 4001 })).toBe("user_rejection");
    expect(evm.classifyError(new Error("INSUFFICIENT_OUTPUT_AMOUNT"))).toBe(
      "slippage"
    );
  });

  it("does not include Solana-only TransactionError names", () => {
    expect(evm.hasLocalPattern("ClusterMaintenance")).toBe(false);
    expect(evm.hasLocalPattern("InsufficientFundsForFee")).toBe(false);
    expect(evm.classifyError(new Error("ClusterMaintenance"))).toBe("unknown");
  });
});

describe("web3-error-humanizer/solana", () => {
  afterEach(() => {
    solana.resetCustomPatterns();
  });

  it("matches Solana TransactionError names and shared wallet codes", () => {
    expect(solana.classifyError(new Error("ClusterMaintenance"))).toBe(
      "network"
    );
    expect(solana.classifyError(new Error("InsufficientFundsForFee"))).toBe(
      "insufficient_funds"
    );
    expect(solana.classifyError({ code: 4001 })).toBe("user_rejection");
  });

  it("does not include Uniswap router keys", () => {
    expect(solana.hasLocalPattern("UniswapV2Router: INVALID_PATH")).toBe(false);
    expect(
      solana.classifyError(new Error("UniswapV2Router: INVALID_PATH"))
    ).toBe("unknown");
  });
});
