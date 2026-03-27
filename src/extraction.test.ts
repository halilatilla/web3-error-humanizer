import { describe, expect, it } from "vitest";
import { extractRawMessage, humanizeError } from "./index";

describe("extractRawMessage", () => {
  it("extracts message-like fields from common error shapes", () => {
    expect(extractRawMessage(new Error("test message"))).toBe("test message");
    expect(extractRawMessage({ reason: "test reason" })).toBe("test reason");
    expect(extractRawMessage({ data: { message: "nested msg" } })).toBe(
      "nested msg"
    );
    expect(extractRawMessage(null)).toBe("Unknown error");
  });

  it("uses a recognized code when the free-form message is not helpful", () => {
    expect(
      extractRawMessage({ code: 7001, message: "Opaque provider failure" })
    ).toBe("7001");
  });

  it("prefers a richer matching message over a generic code", () => {
    expect(extractRawMessage({ code: 4001, message: "User rejected" })).toBe(
      "User rejected"
    );
  });

  it("handles Error instances with nested causes and custom fields", () => {
    const error = Object.assign(new Error("outer wrapper"), {
      code: 4001,
      shortMessage: "wallet rejected the request",
      cause: { reason: "ACTION_REJECTED" },
    });

    expect(extractRawMessage(error)).toBe("ACTION_REJECTED");
  });

  it("does not recurse forever on cyclic error graphs", () => {
    const error = new Error("cyclic outer");
    (error as Error & { cause?: unknown }).cause = error;

    expect(extractRawMessage(error)).toBe("cyclic outer");
  });

  it("preserves non-ASCII messages instead of collapsing them", () => {
    expect(humanizeError(new Error("Ошибка сети"))).toBe(
      "Transaction failed. Please try again."
    );
  });
});
