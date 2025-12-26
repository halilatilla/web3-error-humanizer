# web3-error-humanizer

> Transform cryptic Web3 errors into human-friendly messages using AI and local heuristics.

[![npm version](https://img.shields.io/npm/v/web3-error-humanizer.svg)](https://www.npmjs.com/package/web3-error-humanizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

When a DEX swap fails, users see messages like `INSUFFICIENT_OUTPUT_AMOUNT` or `execution reverted: Pancake: K`. This library translates those into actionable, plain-English explanations.

## Features

- **Instant local lookups** — Common errors are matched instantly without API calls
- **AI fallback** — Unknown errors are analyzed by GPT-4o-mini for context-aware explanations
- **viem integration** — Deep error extraction using `error.walk()` for nested blockchain errors
- **Dual module support** — Works with both ESM (`import`) and CommonJS (`require`)
- **TypeScript ready** — Full type definitions included

## Installation

```bash
npm install web3-error-humanizer
```

```bash
pnpm add web3-error-humanizer
```

```bash
yarn add web3-error-humanizer
```

## Quick Start

```typescript
import { Web3ErrorHumanizer } from "web3-error-humanizer";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!,
});

// In your swap error handler:
try {
  await contract.write.swap([...]);
} catch (error) {
  const message = await humanizer.humanize(error);
  console.log(message);
  // → "Price moved too much. Try increasing your slippage tolerance."
}
```

## Usage with Context

Provide swap context for smarter AI responses:

```typescript
const message = await humanizer.humanize(error, {
  fromToken: "USDC",
  toToken: "PEPE",
  amount: "1000",
  slippage: "0.5%",
  network: "Ethereum",
});
// → "PEPE's price is changing rapidly. Increase slippage to 1-2% or try a smaller amount."
```

## API Reference

### `new Web3ErrorHumanizer(config)`

Creates a new humanizer instance.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config.openaiApiKey` | `string` | Yes | Your OpenAI API key |
| `config.aiModel` | `string` | No | Model to use (default: `gpt-4o-mini`) |
| `config.template` | `string` | No | Custom prompt template (reserved for future use) |

### `humanizer.humanize(error, context?)`

Translates a Web3 error into a human-readable message.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `error` | `unknown` | The caught error object (viem, ethers, or generic) |
| `context` | `SwapContext` | Optional swap details for smarter responses |

**Returns:** `Promise<string>` — The human-friendly error message.

### `SwapContext`

```typescript
interface SwapContext {
  fromToken?: string;  // Token being sold
  toToken?: string;    // Token being bought
  amount?: string;     // Amount being swapped
  slippage?: string;   // Slippage tolerance (e.g., "0.5%")
  network?: string;    // Network name (e.g., "Ethereum", "BSC")
}
```

## Supported Error Types

These errors are matched **instantly** without AI:

| Error Code | Human Message |
|------------|---------------|
| `INSUFFICIENT_FUNDS` | You don't have enough gas (ETH/native token) to pay for this transaction. |
| `ACTION_REJECTED` | The transaction was cancelled in your wallet. |
| `EXPIRED` | The swap took too long to confirm. Please try again with a higher gas fee. |
| `INSUFFICIENT_OUTPUT_AMOUNT` | Price moved too much. Try increasing your slippage tolerance. |
| `TRANSFER_FROM_FAILED` | Token approval failed or you have insufficient balance of the token you are selling. |
| `Pancake: K` | Low liquidity for this pair. Try a smaller swap amount. |

All other errors are sent to OpenAI for analysis.

## How It Works

```
┌─────────────────┐
│  Caught Error   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Extract Message │  ← Uses viem's error.walk() for nested errors
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│ Local Dictionary│────▶│ Instant Response │  (free, <1ms)
└────────┬────────┘     └──────────────────┘
         │ no match
         ▼
┌─────────────────┐     ┌──────────────────┐
│   OpenAI API    │────▶│ AI-Generated Msg │  (paid, ~500ms)
└─────────────────┘     └──────────────────┘
```

## Framework Examples

### Next.js / React

```tsx
"use client";
import { Web3ErrorHumanizer } from "web3-error-humanizer";
import { useState } from "react";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY!,
});

export function SwapButton() {
  const [error, setError] = useState<string | null>(null);

  const handleSwap = async () => {
    try {
      // your swap logic
    } catch (err) {
      const message = await humanizer.humanize(err, {
        fromToken: "ETH",
        toToken: "USDC",
      });
      setError(message);
    }
  };

  return (
    <>
      <button onClick={handleSwap}>Swap</button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
```

### Node.js Backend

```typescript
import { Web3ErrorHumanizer } from "web3-error-humanizer";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!,
  aiModel: "gpt-4-turbo", // use a more powerful model
});

app.post("/api/swap", async (req, res) => {
  try {
    const result = await executeSwap(req.body);
    res.json({ success: true, result });
  } catch (error) {
    const message = await humanizer.humanize(error, req.body);
    res.status(400).json({ success: false, message });
  }
});
```

### CommonJS

```javascript
const { Web3ErrorHumanizer } = require("web3-error-humanizer");

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY,
});
```

## Extending the Local Dictionary

You can import the local error map for customization:

```typescript
import { LOCAL_ERROR_MAP } from "web3-error-humanizer";

// Add your own mappings
LOCAL_ERROR_MAP["CUSTOM_ERROR"] = "Your custom message here.";
```

## Cost Optimization

The library is designed to minimize API costs:

1. **Local-first** — Common errors never hit the API
2. **Concise prompts** — AI requests use minimal tokens
3. **gpt-4o-mini default** — Uses the most cost-effective model

For high-volume applications, consider:
- Adding more patterns to the local dictionary
- Caching AI responses for repeated errors
- Using a faster/cheaper model via `aiModel` config

## Requirements

- Node.js 18+ or modern browser
- OpenAI API key

## License

MIT © [halilatilla](https://github.com/halilatilla)


