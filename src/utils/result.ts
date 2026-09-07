import { getCategoryMeta, resolveErrorCategory } from "../data/category-meta";
import type { ErrorCategory, HumanizedResult } from "../types";

export function buildHumanizedResult(
  match: {
    matchedKey: string;
    message: string;
    category: ErrorCategory;
    code?: string;
  } | null,
  rawMessage: string,
  fallback: string
): HumanizedResult {
  if (match) {
    const meta = getCategoryMeta(match.category);
    return {
      message: match.message,
      source: "local",
      category: resolveErrorCategory(match.category),
      severity: meta.severity,
      suggestion: meta.suggestion,
      recoverable: meta.recoverable,
      matchedKey: match.matchedKey,
      rawMessage,
      ...(match.code ? { code: match.code } : {}),
    };
  }

  const meta = getCategoryMeta("unknown");
  return {
    message: fallback,
    source: "fallback",
    category: "unknown",
    severity: meta.severity,
    suggestion: meta.suggestion,
    recoverable: meta.recoverable,
    rawMessage,
  };
}

export function buildExtractionFailureResult(
  fallback: string
): HumanizedResult {
  const meta = getCategoryMeta("unknown");
  return {
    message: fallback,
    source: "fallback",
    category: "unknown",
    severity: meta.severity,
    suggestion: meta.suggestion,
    recoverable: meta.recoverable,
    rawMessage: "Error extraction failed",
  };
}
