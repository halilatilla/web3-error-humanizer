import { CATEGORY_META } from "../data/category-meta";
import { DEFAULT_FALLBACK_MESSAGE } from "../data/defaults";
import { evmPatternSet } from "../data/pattern-sets/evm";
import { createPatternRuntime } from "../runtime/create-pattern-runtime";

export type { LocalHumanizer } from "../create-humanizer";
export * from "../types";
export { CATEGORY_META, DEFAULT_FALLBACK_MESSAGE };

const runtime = createPatternRuntime(evmPatternSet);

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
