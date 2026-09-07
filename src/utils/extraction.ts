import { matchLocalErrorDetailed } from "./matching";

export type MessageRecognizer = (message: string) => boolean;

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

type MaybeErrorObject = Record<string, unknown>;

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

function isObject(value: unknown): value is MaybeErrorObject {
  return typeof value === "object" && value !== null;
}

function shouldSkipCandidate(value: unknown): value is undefined | null | "" {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "Unknown error"
  );
}

function pickBestCandidate(
  candidates: Array<string | null | undefined>,
  isRecognized: MessageRecognizer
): string {
  let fallbackCandidate: string | null = null;

  for (const candidate of candidates) {
    if (shouldSkipCandidate(candidate)) {
      continue;
    }

    fallbackCandidate ??= candidate;

    if (isRecognized(candidate)) {
      return candidate;
    }
  }

  return fallbackCandidate ?? "Unknown error";
}

function extractFromKnownShape(
  error: ErrorLike,
  seen: WeakSet<object>,
  isRecognized: MessageRecognizer
): string {
  const nestedData = isObject(error.data) ? error.data : undefined;
  const nestedError =
    error.error !== undefined
      ? extractRawMessage(error.error, seen, isRecognized)
      : null;
  const nestedCause =
    error.cause !== undefined
      ? extractRawMessage(error.cause, seen, isRecognized)
      : null;
  const rawCode =
    typeof error.code === "number" || typeof error.code === "string"
      ? String(error.code)
      : null;
  const codeCandidate = rawCode && isRecognized(rawCode) ? rawCode : null;

  return pickBestCandidate(
    [
      error.reason,
      nestedData?.reason,
      error.shortMessage,
      nestedData?.message,
      nestedError,
      nestedCause,
      error.message,
      codeCandidate,
    ],
    isRecognized
  );
}

/**
 * Extract raw message from complex Web3 error objects.
 * Supports: viem, ethers.js, web3.js, and generic error objects.
 */
const defaultRecognizer: MessageRecognizer = (message) =>
  matchLocalErrorDetailed(message) !== null;

export function extractRawMessage(
  error: unknown,
  seen: WeakSet<object> = new WeakSet(),
  isRecognized: MessageRecognizer = defaultRecognizer
): string {
  if (error === null || error === undefined) {
    return "Unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (isObject(error)) {
    if (seen.has(error)) {
      return "Unknown error";
    }

    seen.add(error);
  }

  if (isViemBaseError(error)) {
    const revertError = error.walk(isContractFunctionRevertedError);
    if (revertError && typeof revertError === "object") {
      const revert = revertError as ViemRevertLike;
      return pickBestCandidate(
        [
          revert.reason,
          revert.shortMessage,
          revert.message,
          error.shortMessage,
          error.message,
        ],
        isRecognized
      );
    }
    return pickBestCandidate([error.shortMessage, error.message], isRecognized);
  }

  if (isObject(error)) {
    return extractFromKnownShape(error as ErrorLike, seen, isRecognized);
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}
