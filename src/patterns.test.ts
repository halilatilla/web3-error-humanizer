import { beforeEach, describe, expect, it } from "vitest";
import {
  BUILTIN_CATEGORIZED_PATTERNS,
  BUILTIN_LOCAL_ERROR_MAP,
  CATEGORIZED_PATTERNS,
  LOCAL_ERROR_MAP,
  addPattern,
  addPatterns,
  classifyError,
  getLocalErrorCount,
  getLocalPatterns,
  hasLocalPattern,
  humanizeError,
  isRecoverable,
  resetCustomPatterns,
} from "./index";

describe("pattern registry", () => {
  beforeEach(() => {
    resetCustomPatterns();
  });

  it("keeps the flat map and categorized map in sync", () => {
    expect(Object.keys(CATEGORIZED_PATTERNS).length).toBe(
      Object.keys(LOCAL_ERROR_MAP).length
    );

    for (const [key, pattern] of Object.entries(CATEGORIZED_PATTERNS)) {
      expect(typeof pattern.message).toBe("string");
      expect(typeof pattern.category).toBe("string");
      expect(LOCAL_ERROR_MAP[key]).toBe(pattern.message);
    }
  });

  it("exposes built-in snapshots without mutating them", () => {
    addPattern("TEST_CUSTOM_ERROR_SINGLE_12345", "Custom single test message.");

    expect(BUILTIN_CATEGORIZED_PATTERNS).not.toHaveProperty(
      "TEST_CUSTOM_ERROR_SINGLE_12345"
    );
    expect(BUILTIN_LOCAL_ERROR_MAP).not.toHaveProperty(
      "TEST_CUSTOM_ERROR_SINGLE_12345"
    );
  });

  it("reports counts and keys for supported patterns", () => {
    const patterns = getLocalPatterns();

    expect(getLocalErrorCount()).toBe(Object.keys(CATEGORIZED_PATTERNS).length);
    expect(patterns.length).toBe(getLocalErrorCount());
    expect(patterns).toContain("INSUFFICIENT_FUNDS");
    expect(hasLocalPattern("ACTION_REJECTED")).toBe(true);
    expect(hasLocalPattern("RANDOM_NONEXISTENT_ERROR")).toBe(false);
  });

  it("adds and resets custom patterns", () => {
    addPattern(
      "TEST_CUSTOM_SLIPPAGE_99999",
      "Custom slippage message.",
      "slippage"
    );
    addPatterns({
      TEST_BATCH_A_67890: "Batch message A.",
      TEST_CAT_BRIDGE_55555: { message: "Bridge test.", category: "bridge" },
    });

    expect(classifyError(new Error("TEST_CUSTOM_SLIPPAGE_99999"))).toBe(
      "slippage"
    );
    expect(isRecoverable(new Error("TEST_CUSTOM_SLIPPAGE_99999"))).toBe(true);
    expect(humanizeError(new Error("TEST_BATCH_A_67890"))).toBe(
      "Batch message A."
    );
    expect(classifyError(new Error("TEST_CAT_BRIDGE_55555"))).toBe("bridge");

    resetCustomPatterns();
    expect(hasLocalPattern("TEST_BATCH_A_67890")).toBe(false);
    expect(hasLocalPattern("TEST_CUSTOM_SLIPPAGE_99999")).toBe(false);
  });

  it("rejects new patterns that normalize to an existing key", () => {
    expect(() =>
      addPattern("User rejected!", "Duplicate normalized key.")
    ).toThrow(/normalizes to an existing key/);
  });

  it("applies batch additions atomically when a later key conflicts", () => {
    expect(() =>
      addPatterns({
        TEST_BATCH_OK_1: "Batch message A.",
        "User rejected!": "Duplicate normalized key.",
      })
    ).toThrow(/normalizes to an existing key/);

    expect(hasLocalPattern("TEST_BATCH_OK_1")).toBe(false);
    expect(LOCAL_ERROR_MAP).not.toHaveProperty("TEST_BATCH_OK_1");
  });

  it("rejects duplicate normalized keys inside the same batch", () => {
    expect(() =>
      addPatterns({
        BatchKey: "First value.",
        "BatchKey!": "Second value.",
      })
    ).toThrow(/conflicts with another key in the same batch/);
  });

  it("supports Unicode pattern matching without empty-string collisions", () => {
    addPattern("Ошибка сети", "Network issue.", "network");

    expect(humanizeError(new Error("Ошибка сети"))).toBe("Network issue.");
    expect(classifyError(new Error("Ошибка кошелька"))).toBe("unknown");
  });
});
