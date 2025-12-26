import { BaseError, ContractFunctionRevertedError } from "viem";
import { LOCAL_ERROR_MAP } from "../data/error-map";

/**
 * Extract raw message from complex Web3 error objects
 */
export function extractRawMessage(error: unknown): string {
  if (error instanceof BaseError) {
    const revertError = error.walk(
      (err) => err instanceof ContractFunctionRevertedError,
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      return revertError.reason || revertError.shortMessage || error.message;
    }
    return error.shortMessage || error.message;
  }

  // Ethers/Generic handling
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;

    // Check for error code (EIP-1193)
    if (typeof err.code === "number" || typeof err.code === "string") {
      const codeStr = String(err.code);
      if (LOCAL_ERROR_MAP[codeStr]) {
        return codeStr;
      }
    }

    if (typeof err.reason === "string") return err.reason;
    if (err.data && typeof err.data === "object") {
      const data = err.data as Record<string, unknown>;
      if (typeof data.message === "string") return data.message;
    }
    if (typeof err.message === "string") return err.message;
    if (typeof err.shortMessage === "string") return err.shortMessage;
  }

  return JSON.stringify(error);
}
