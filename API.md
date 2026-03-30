# API Reference

## Standalone Functions (No API Key Required)

Import from `web3-error-humanizer` (zero dependencies).

### `humanizeError(error, fallback?)`

Humanize an error using only the local dictionary. Always returns a string.

```typescript
import { humanizeError } from "web3-error-humanizer";

const message = humanizeError(error);
// Returns human message or "Transaction failed. Please try again."

const message = humanizeError(error, "Custom fallback");
// Returns human message or "Custom fallback"
```

### `humanizeErrorLocal(error)`

Same as above but returns `null` if no local match found.

```typescript
import { humanizeErrorLocal } from "web3-error-humanizer";

const message = humanizeErrorLocal(error);
if (message) {
  showError(message);
} else {
  // Handle unknown error your way
}
```

### `humanizeErrorDetailed(error, fallback?)`

Local-only humanization that returns a rich `HumanizedResult` object:

```typescript
import { humanizeErrorDetailed } from "web3-error-humanizer";

const result = humanizeErrorDetailed(error);
// {
//   message:     "Price moved too much. Try increasing your slippage tolerance.",
//   category:    "slippage",
//   severity:    "warning",
//   suggestion:  "Increase your slippage tolerance or try a smaller amount.",
//   recoverable: true,
//   source:      "local",
//   matchedKey:  "INSUFFICIENT_OUTPUT_AMOUNT",
//   rawMessage:  "INSUFFICIENT_OUTPUT_AMOUNT"
// }
```

### `classifyError(error)`

Returns the `ErrorCategory` for an error without humanizing it. Returns `"unknown"` if no match.

```typescript
import { classifyError } from "web3-error-humanizer";

classifyError(new Error("INSUFFICIENT_FUNDS")); // "insufficient_funds"
classifyError(new Error("ACTION_REJECTED")); // "user_rejection"
classifyError({ code: 4001, message: "..." }); // "user_rejection"
```

### `isRecoverable(error)` / `getSuggestion(error)` / `getErrorSeverity(error)`

```typescript
import {
  isRecoverable,
  getSuggestion,
  getErrorSeverity,
} from "web3-error-humanizer";

isRecoverable(new Error("out of gas")); // true
isRecoverable(new Error("execution reverted")); // false

getSuggestion(new Error("INSUFFICIENT_FUNDS"));
// "Add more funds to your wallet and try again."

getErrorSeverity(new Error("ACTION_REJECTED")); // "info"
getErrorSeverity(new Error("NETWORK_ERROR")); // "error"
```

### `extractRawMessage(error)`

Extracts the raw error message from any error object (Error, ethers, viem, plain object, etc.).

```typescript
import { extractRawMessage } from "web3-error-humanizer";

extractRawMessage(new Error("out of gas")); // "out of gas"
extractRawMessage({ reason: "INSUFFICIENT_FUNDS" }); // "INSUFFICIENT_FUNDS"
extractRawMessage(null); // "Unknown error"
```

### `addPattern(key, message, category?)` / `addPatterns(map)`

Add custom error patterns at runtime. Optionally specify a category for structured classification.

Custom patterns are **process-wide**. If you add them in tests, call `resetCustomPatterns()` between cases.

```typescript
import { addPattern, addPatterns } from "web3-error-humanizer";

// Simple (defaults to "unknown" category)
addPattern("CUSTOM_DEX_ERROR", "Your custom message here.");

// With category
addPattern("MY_SLIPPAGE_ERROR", "Price moved.", "slippage");

// Batch add (string values default to "unknown" category)
addPatterns({
  "MyProtocol: SLIPPAGE": "Price moved. Increase slippage.",
  "MyProtocol: LOCKED": "Pool is locked. Try again later.",
});

// Batch add with categories
addPatterns({
  "MyProtocol: SLIPPAGE": { message: "Price moved.", category: "slippage" },
  "MyProtocol: PAUSED": { message: "Pool paused.", category: "protocol_limit" },
});
```

Normalized duplicate keys are rejected so new custom patterns cannot silently shadow an existing built-in pattern.

### `getLocalErrorCount()` / `hasLocalPattern(pattern)` / `getLocalPatterns()`

```typescript
import {
  getLocalErrorCount,
  hasLocalPattern,
  getLocalPatterns,
} from "web3-error-humanizer";

console.log(getLocalErrorCount()); // 770+
console.log(hasLocalPattern("INSUFFICIENT_FUNDS")); // true
console.log(getLocalPatterns()); // ["ACTION_REJECTED", "INSUFFICIENT_FUNDS", ...]
```

### `resetCustomPatterns()` / `BUILTIN_LOCAL_ERROR_MAP` / `BUILTIN_CATEGORIZED_PATTERNS`

Use these helpers if you want to inspect the shipped dictionary or reset runtime mutations:

```typescript
import {
  BUILTIN_LOCAL_ERROR_MAP,
  BUILTIN_CATEGORIZED_PATTERNS,
  addPattern,
  resetCustomPatterns,
} from "web3-error-humanizer";

console.log(BUILTIN_LOCAL_ERROR_MAP["INSUFFICIENT_FUNDS"]);
console.log(BUILTIN_CATEGORIZED_PATTERNS["INSUFFICIENT_FUNDS"].category);

addPattern("MY_TEMP_ERROR", "Temporary message.");
resetCustomPatterns(); // removes custom additions and restores built-ins
```

## Class-based API (Optional AI Fallback)

Import from `web3-error-humanizer/ai`. Requires `openai` as a peer dependency.

### `new Web3ErrorHumanizer(config?)`

Creates a new humanizer instance. Config is optional.

| Parameter                | Type     | Required | Description                           |
| ------------------------ | -------- | -------- | ------------------------------------- |
| `config.openaiApiKey`    | `string` | **No**   | OpenAI API key (enables AI fallback)  |
| `config.aiModel`         | `string` | No       | Model to use (default: `gpt-4o-mini`) |
| `config.fallbackMessage` | `string` | No       | Message when no local match and no AI |

```typescript
import { Web3ErrorHumanizer } from "web3-error-humanizer/ai";

// Local only - no API key needed
const humanizer = new Web3ErrorHumanizer();

// With AI fallback
const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY,
});

console.log(humanizer.hasAI); // true or false
```

### `humanizer.humanize(error, context?)`

Translates a Web3 error into a human-readable message.

| Parameter | Type          | Description                                        |
| --------- | ------------- | -------------------------------------------------- |
| `error`   | `unknown`     | The caught error object (viem, ethers, or generic) |
| `context` | `SwapContext` | Optional swap details for smarter AI responses     |

**Returns:** `Promise<string>` -- The human-friendly error message.

### `humanizer.humanizeDetailed(error, context?)`

Returns a full `HumanizedResult` including `message`, `category`, `severity`, `suggestion`, `recoverable`, `source`, `matchedKey`, and `rawMessage`. Uses local dictionary first, then AI (if configured), otherwise the fallback message.

## Types

### `HumanizedResult`

```typescript
interface HumanizedResult {
  message: string; // Human-friendly error message
  category: ErrorCategory; // e.g. "slippage", "gas", "user_rejection"
  severity: ErrorSeverity; // "error" | "warning" | "info"
  suggestion: string; // Actionable next step for the user
  recoverable: boolean; // Can the user take action to fix this?
  source: HumanizeSource; // "local" | "ai" | "fallback"
  matchedKey?: string; // The matched pattern key (when source === "local")
  rawMessage: string; // The extracted raw error message
}
```

### `ErrorCategory`

```typescript
type ErrorCategory =
  | "user_rejection"
  | "insufficient_funds"
  | "insufficient_allowance"
  | "slippage"
  | "liquidity"
  | "gas"
  | "nonce"
  | "network"
  | "contract_error"
  | "timeout"
  | "wallet_connection"
  | "chain_mismatch"
  | "protocol_limit"
  | "signature"
  | "bridge"
  | "unknown";
```

### `SwapContext`

```typescript
interface SwapContext {
  fromToken?: string; // Token being sold
  toToken?: string; // Token being bought
  amount?: string; // Amount being swapped
  slippage?: string; // Slippage tolerance (e.g., "0.5%")
  network?: string; // Network name (e.g., "Ethereum", "BSC")
}
```
