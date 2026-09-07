import { CATEGORY_META } from "../data/category-meta";
import { DEFAULT_FALLBACK_MESSAGE } from "../data/defaults";
import { solanaPatternSet } from "../data/pattern-sets/solana";
import { createPatternRuntime } from "../runtime/create-pattern-runtime";

export type { LocalHumanizer } from "../create-humanizer";
export * from "../types";
export { CATEGORY_META, DEFAULT_FALLBACK_MESSAGE };

const runtime = createPatternRuntime(solanaPatternSet);

export const {
  humanizeError,
  humanizeErrorLocal,
  humanizeErrorDetailed,
  classifyError,
  isRecoverable,
  getSuggestion,
  getErrorSeverity,
  addPattern,
  addPatterns,
  resetCustomPatterns,
  getLocalErrorCount,
  hasLocalPattern,
  getLocalPatterns,
  createHumanizer,
  extractRawMessage,
} = runtime;
