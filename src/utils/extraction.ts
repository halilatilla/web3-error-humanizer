import { LOCAL_ERROR_MAP } from "../data/error-map";

interface ErrorLike {
  code?: number | string;
  message?: string;
  reason?: string;
  shortMessage?: string;
  data?: {
    message?: string;
    reason?: string;
    [key: string]: unknown;
  };
  cause?: unknown;
  error?: ErrorLike | string;
  walk?: (predicate: (err: unknown) => boolean) => unknown;
}

interface ViemRevertLike {
  reason?: string;
  shortMessage?: string;
  message?: string;
}

function isViemBaseError(
  error: unknown
): error is Error &
  ErrorLike & { walk: (fn: (err: unknown) => boolean) => unknown } {
  return (
    error instanceof Error &&
    typeof (error as ErrorLike).walk === "function" &&
    "shortMessage" in error
  );
}

function isContractFunctionRevertedError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const name = (err as { name?: string }).name;
  return name === "ContractFunctionRevertedError";
}

/**
 * Extract raw message from complex Web3 error objects.
 * Supports: viem, ethers.js, web3.js, and generic error objects.
 */
export function extractRawMessage(error: unknown): string {
  if (error === null || error === undefined) {
    return "Unknown error";
  }

  if (isViemBaseError(error)) {
    const revertError = error.walk(isContractFunctionRevertedError);
    if (revertError && typeof revertError === "object") {
      const revert = revertError as ViemRevertLike;
      return revert.reason || revert.shortMessage || error.message;
    }
    return error.shortMessage || error.message;
  }

  if (error instanceof Error) {
    if (error.cause) {
      const causeMessage = extractRawMessage(error.cause);
      if (causeMessage !== "Unknown error") {
        return causeMessage;
      }
    }
    return error.message;
  }

  if (error && typeof error === "object") {
    const err = error as ErrorLike;

    if (typeof err.code === "number" || typeof err.code === "string") {
      const codeStr = String(err.code);
      if (LOCAL_ERROR_MAP[codeStr]) {
        return codeStr;
      }
    }

    if (typeof err.reason === "string" && err.reason) {
      return err.reason;
    }

    if (err.data && typeof err.data === "object") {
      const data = err.data as Record<string, unknown>;
      if (typeof data.message === "string" && data.message) {
        return data.message;
      }
      if (typeof data.reason === "string" && data.reason) {
        return data.reason;
      }
    }

    if (typeof err.shortMessage === "string" && err.shortMessage) {
      return err.shortMessage;
    }

    if (typeof err.message === "string" && err.message) {
      return err.message;
    }

    if (err.error) {
      const nestedMessage = extractRawMessage(err.error);
      if (nestedMessage !== "Unknown error") {
        return nestedMessage;
      }
    }

    if (err.cause) {
      const causeMessage = extractRawMessage(err.cause);
      if (causeMessage !== "Unknown error") {
        return causeMessage;
      }
    }
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}
