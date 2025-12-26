import { BaseError, ContractFunctionRevertedError } from "viem";
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
}

/**
 * Extract raw message from complex Web3 error objects
 * Supports: viem, ethers.js, web3.js, and generic error objects
 */
export function extractRawMessage(error: unknown): string {
  // Handle null/undefined
  if (error === null || error === undefined) {
    return "Unknown error";
  }

  // Handle viem BaseError (most common)
  if (error instanceof BaseError) {
    const revertError = error.walk(
      (err) => err instanceof ContractFunctionRevertedError
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      return revertError.reason || revertError.shortMessage || error.message;
    }
    return error.shortMessage || error.message;
  }

  // Handle Error objects
  if (error instanceof Error) {
    // Check for error.cause (Error chaining)
    if (error.cause) {
      const causeMessage = extractRawMessage(error.cause);
      if (causeMessage !== "Unknown error") {
        return causeMessage;
      }
    }
    return error.message;
  }

  // Handle plain objects
  if (error && typeof error === "object") {
    const err = error as ErrorLike;

    // Check for error code (EIP-1193)
    if (typeof err.code === "number" || typeof err.code === "string") {
      const codeStr = String(err.code);
      if (LOCAL_ERROR_MAP[codeStr]) {
        return codeStr;
      }
    }

    // Check common error properties in order of specificity
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

    // Handle nested error objects
    if (err.error) {
      const nestedMessage = extractRawMessage(err.error);
      if (nestedMessage !== "Unknown error") {
        return nestedMessage;
      }
    }

    // Handle error.cause
    if (err.cause) {
      const causeMessage = extractRawMessage(err.cause);
      if (causeMessage !== "Unknown error") {
        return causeMessage;
      }
    }
  }

  // Handle strings
  if (typeof error === "string") {
    return error;
  }

  // Fallback: try to stringify
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}
