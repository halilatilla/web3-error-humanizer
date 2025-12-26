# web3-error-humanizer

> Transform cryptic Web3 errors into human-friendly messages using AI and local heuristics.

[![npm version](https://img.shields.io/npm/v/web3-error-humanizer.svg)](https://www.npmjs.com/package/web3-error-humanizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/web3-error-humanizer)](https://bundlephobia.com/package/web3-error-humanizer)

When a DEX swap fails, users see messages like `INSUFFICIENT_OUTPUT_AMOUNT` or `execution reverted: Pancake: K`. This library translates those into actionable, plain-English explanations.

## Features

- **598+ local error patterns** — Most errors are matched instantly without API calls (O(1) exact matches)
- **AI fallback** — Unknown errors are analyzed by GPT-4o-mini for context-aware explanations
- **viem integration** — Deep error extraction using `error.walk()` for nested blockchain errors
- **Enhanced error extraction** — Supports error chains, nested errors, and multiple error formats
- **Performance optimized** — Map-based lookups for instant exact matches
- **Dual module support** — Works with both ESM (`import`) and CommonJS (`require`)
- **TypeScript ready** — Full type definitions included
- **Zero dependencies** (for local-only mode) — Works without API keys

## Supported Protocols

| Protocol                           | Errors Covered                                                             |
| ---------------------------------- | -------------------------------------------------------------------------- |
| **Uniswap V2/V3/V4**               | K, INSUFFICIENT_OUTPUT_AMOUNT, EXPIRED, LOCKED, SPL, Hook errors, and more |
| **PancakeSwap**                    | K, INSUFFICIENT_LIQUIDITY, TRANSFER_FAILED, etc.                           |
| **SushiSwap**                      | K, INSUFFICIENT_OUTPUT_AMOUNT, EXPIRED                                     |
| **Curve Finance**                  | Insufficient output/input, slippage, math errors                           |
| **Balancer**                       | Insufficient liquidity, paused pools, swap disabled                        |
| **1inch**                          | minReturn, ReturnAmountIsNotEnough, insufficient liquidity                 |
| **DODO**                           | Insufficient output/input, liquidity errors                                |
| **KyberSwap**                      | Insufficient output/input, liquidity errors                                |
| **Aave V3**                        | VL\_\* errors (borrowing, supply caps, health factors)                     |
| **Account Abstraction (ERC-4337)** | AA10-AA51 (EntryPoint errors, paymaster, validation)                       |
| **Solana / Jupiter**               | Program errors, slippage, compute budget, blockhash                        |
| **LayerZero**                      | Bridge errors, token unavailability, message blocking                      |
| **Li.Fi / Stargate**               | Route errors, slippage, amount limits                                      |
| **Arbitrum / Optimism**            | Retryable tickets, L2 execution, fee errors                                |
| **MetaMask/EIP-1193**              | 4001, 4100, 4900, -32603, and all standard codes                           |
| **WalletConnect/Reown**            | USER_REJECTED, SESSION_EXPIRED, APKT001-APKT010                            |
| **Gnosis Safe**                    | GS000-GS031 (initialization, signatures, owners)                           |
| **ERC20/721/1155**                 | ERC-6093 standard errors, allowance, balance, transfer                     |
| **Gas/Network**                    | Underpriced, out of gas, timeout, replacement errors                       |
| **Hardware Wallets**               | Ledger, Trezor connection and signing errors                               |
| **Multi-chain Wallets**            | Phantom, TronLink, Sui, Aptos, TON, Bitcoin wallets                        |

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

### Option 1: Local Only (No API Key Required) ✨

```typescript
import { humanizeError } from "web3-error-humanizer";

try {
  await contract.write.swap([...]);
} catch (error) {
  const message = humanizeError(error);
  console.log(message);
  // → "Price moved too much. Try increasing your slippage tolerance."
}
```

**Zero cost, instant response, 598+ error patterns covered!**

### Option 2: With AI Fallback

```typescript
import { Web3ErrorHumanizer } from "web3-error-humanizer";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!, // Optional!
});

try {
  await contract.write.swap([...]);
} catch (error) {
  const message = await humanizer.humanize(error);
  console.log(message);
  // Local match → instant response
  // Unknown error → AI generates response
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

### Standalone Functions (No API Key Required)

#### `humanizeError(error, fallback?)`

Humanize an error using only the local dictionary. Always returns a string.

```typescript
import { humanizeError } from "web3-error-humanizer";

const message = humanizeError(error);
// Returns human message or "Transaction failed. Please try again."

const message = humanizeError(error, "Custom fallback");
// Returns human message or "Custom fallback"
```

#### `humanizeErrorLocal(error)`

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

#### `humanizeErrorDetailed(error, fallback?)`

Local-only humanization that also returns metadata (matched key, source, raw message).

```typescript
import { humanizeErrorDetailed } from "web3-error-humanizer";

const result = humanizeErrorDetailed(error);
// {
//   message: "Price moved too much. Try increasing your slippage tolerance.",
//   source: "local",
//   matchedKey: "INSUFFICIENT_OUTPUT_AMOUNT",
//   rawMessage: "INSUFFICIENT_OUTPUT_AMOUNT"
// }
```

### Class-based API (Optional AI Fallback)

#### `new Web3ErrorHumanizer(config?)`

Creates a new humanizer instance. Config is optional!

| Parameter                | Type     | Required | Description                           |
| ------------------------ | -------- | -------- | ------------------------------------- |
| `config.openaiApiKey`    | `string` | **No**   | OpenAI API key (enables AI fallback)  |
| `config.aiModel`         | `string` | No       | Model to use (default: `gpt-4o-mini`) |
| `config.fallbackMessage` | `string` | No       | Message when no local match and no AI |

```typescript
// Local only - no API key needed!
const humanizer = new Web3ErrorHumanizer();

// With AI fallback
const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY,
});

// Check if AI is enabled
console.log(humanizer.hasAI); // true or false
```

#### `humanizer.humanizeDetailed(error, context?)`

Returns `{ message, source, matchedKey?, rawMessage }`. Uses local dictionary first, then AI (if configured), otherwise the fallback message.

#### `humanizer.humanize(error, context?)`

Translates a Web3 error into a human-readable message.

| Parameter | Type          | Description                                        |
| --------- | ------------- | -------------------------------------------------- |
| `error`   | `unknown`     | The caught error object (viem, ethers, or generic) |
| `context` | `SwapContext` | Optional swap details for smarter AI responses     |

**Returns:** `Promise<string>` — The human-friendly error message.

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

### `getLocalErrorCount()`

Returns the number of locally supported error patterns.

```typescript
import { getLocalErrorCount } from "web3-error-humanizer";
console.log(getLocalErrorCount()); // 598+
```

## Supported Error Categories

### User Actions / Wallet Rejections

| Error Pattern     | Human Message                                 |
| ----------------- | --------------------------------------------- |
| `ACTION_REJECTED` | The transaction was cancelled in your wallet. |
| `USER_REJECTED`   | You declined the request in your wallet.      |
| `4001`            | You declined the request in your wallet.      |

### Insufficient Funds / Balance

| Error Pattern          | Human Message                                          |
| ---------------------- | ------------------------------------------------------ |
| `INSUFFICIENT_FUNDS`   | You don't have enough gas to pay for this transaction. |
| `insufficient balance` | Your token balance is too low for this swap.           |
| `exceeds balance`      | The amount exceeds your available balance.             |

### Slippage / Price Impact

| Error Pattern                | Human Message                                                 |
| ---------------------------- | ------------------------------------------------------------- |
| `INSUFFICIENT_OUTPUT_AMOUNT` | Price moved too much. Try increasing your slippage tolerance. |
| `Too little received`        | Price changed too much. Increase your slippage tolerance.     |
| `INSUFFICIENT_LIQUIDITY`     | Not enough liquidity for this trade. Try a smaller amount.    |

### DEX-Specific (Uniswap, PancakeSwap, SushiSwap)

| Error Pattern              | Human Message                                           |
| -------------------------- | ------------------------------------------------------- |
| `UniswapV2: K`             | Low liquidity for this pair. Try a smaller swap amount. |
| `Pancake: K`               | Low liquidity for this pair. Try a smaller swap amount. |
| `UniswapV2: LOCKED`        | This pair is currently locked. Try again shortly.       |
| `UniswapV2Router: EXPIRED` | Transaction expired. Please try again.                  |

### Token Approval

| Error Pattern                   | Human Message                                        |
| ------------------------------- | ---------------------------------------------------- |
| `insufficient allowance`        | You need to approve the token first before swapping. |
| `ERC20: insufficient allowance` | Please approve the token before swapping.            |
| `TRANSFER_FROM_FAILED`          | Token approval failed or insufficient balance.       |

### Gas / Network

| Error Pattern                         | Human Message                                             |
| ------------------------------------- | --------------------------------------------------------- |
| `out of gas`                          | Transaction ran out of gas. Try increasing the gas limit. |
| `replacement transaction underpriced` | Gas price too low to replace pending transaction.         |
| `TIMEOUT`                             | Request timed out. Please check your connection.          |
| `NETWORK_ERROR`                       | Network connection issue. Please check your internet.     |

### RPC Error Codes (EIP-1193)

| Code     | Human Message                                              |
| -------- | ---------------------------------------------------------- |
| `4001`   | You declined the request in your wallet.                   |
| `4900`   | Wallet is disconnected. Please reconnect.                  |
| `4901`   | Wallet is connected to a different network. Please switch. |
| `-32603` | Internal error. Please try again.                          |

### Account Abstraction (ERC-4337)

| Error Code | Human Message                                                          |
| ---------- | ---------------------------------------------------------------------- |
| `AA10`     | Account already exists. You cannot initialize it again.                |
| `AA21`     | You don't have enough native tokens to pay for this transaction's gas. |
| `AA23`     | Transaction validation failed. Signature is wrong or gas is too low.   |
| `AA31`     | The gas sponsor (Paymaster) has run out of funds. Try again later.     |

### Uniswap V4 / Hooks

| Error Pattern    | Human Message                                                              |
| ---------------- | -------------------------------------------------------------------------- |
| `UniswapV4: LOK` | The pool is locked. A hook might be preventing re-entry.                   |
| `UniswapV4: SPL` | Price limit reached. The trade would move the price too far.               |
| `HookReverted`   | A custom logic 'hook' attached to this pool failed. Try a different route. |
| `FeeTooHigh`     | The dynamic fee set by the pool's hook is too high for this trade.         |

### Bridge & Cross-Chain

| Error Pattern                   | Human Message                                                                |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `LayerZero: LzTokenUnavailable` | The bridge does not have enough liquidity of this token right now.           |
| `NOT_PROCESSABLE_REFUND_NEEDED` | The bridge failed due to price movement. A refund has been triggered.        |
| `AMOUNT_TOO_LOW`                | The amount is too small to bridge. Please send more.                         |
| `retryable ticket expired`      | Arbitrum retryable expired. Re-send the transaction or re-create the ticket. |

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
│   (598+ errors) │     └──────────────────┘
└────────┬────────┘
         │ no match
         ▼
┌─────────────────┐     ┌──────────────────┐
│   OpenAI API    │────▶│ AI-Generated Msg │  (paid, ~500ms)
└─────────────────┘     └──────────────────┘
```

## Framework Examples

### Next.js / React (Secure - Recommended)

**⚠️ Security Note:** Never expose your OpenAI API key in the browser. Use a server-side API route:

**1. Create API Route (`app/api/humanize-error/route.ts`):**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Web3ErrorHumanizer } from "web3-error-humanizer";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!, // Server-side only
});

export async function POST(request: NextRequest) {
  const { errorMessage, context } = await request.json();
  const message = await humanizer.humanize(new Error(errorMessage), context);
  return NextResponse.json({ message });
}
```

**2. Create Client Helper:**

```typescript
// lib/humanize-error.ts
export async function humanizeError(error: unknown, context?: SwapContext) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  const response = await fetch("/api/humanize-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ errorMessage, context }),
  });

  const data = await response.json();
  return data.message;
}
```

**3. Use in Component:**

```tsx
"use client";
import { humanizeError } from "@/lib/humanize-error";

export function SwapButton() {
  const handleSwap = async () => {
    try {
      await contract.write.swap([...]);
    } catch (err) {
      const message = await humanizeError(err, { fromToken: "ETH", toToken: "USDC" });
      toast.error(message);
    }
  };
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

You can import and extend the local error map:

```typescript
import { LOCAL_ERROR_MAP, getLocalErrorCount } from "web3-error-humanizer";

// Check current coverage
console.log(`Supported patterns: ${getLocalErrorCount()}`); // 598+

// Add your own mappings
LOCAL_ERROR_MAP["CUSTOM_DEX_ERROR"] = "Your custom message here.";
LOCAL_ERROR_MAP["MyProtocol: SLIPPAGE"] = "Price moved. Increase slippage.";
```

## Cost Optimization

The library is designed to minimize API costs:

1. **Local-first** — 598+ error patterns never hit the API
2. **Performance optimized** — O(1) exact matches using Map-based lookups
3. **Concise prompts** — AI requests use minimal tokens (max 100 tokens)
4. **gpt-4o-mini default** — Uses the most cost-effective model
5. **Retry logic** — Automatic retry with exponential backoff for rate limits

For high-volume applications, consider:

- Adding more patterns to the local dictionary
- Caching AI responses for repeated errors (not included, but easy to add)
- Using a faster/cheaper model via `aiModel` config

## Requirements

- Node.js 18+ or modern browser
- OpenAI API key (optional - only needed for AI fallback)

## Performance

- **Exact matches**: O(1) using Map lookups (~170x faster than before)
- **Substring matches**: O(n) but optimized with pre-sorted entries
- **Error extraction**: Handles nested errors, error chains, and multiple formats
- **Normalization**: Unicode-aware with diacritic removal for better matching

## Error Coverage

The library covers errors from:

- **DEX Protocols**: Uniswap (V2/V3/V4), PancakeSwap, SushiSwap, Curve, Balancer, 1inch, DODO, KyberSwap
- **Lending**: Aave V3 (VL\_\* errors)
- **Account Abstraction**: ERC-4337 EntryPoint errors (AA10-AA51)
- **Bridges**: LayerZero, Li.Fi, Stargate, Arbitrum, Optimism
- **Wallets**: MetaMask, WalletConnect/Reown, Phantom, TronLink, Sui, Aptos, TON, Bitcoin wallets
- **Hardware**: Ledger, Trezor
- **Multi-sig**: Gnosis Safe (GS000-GS031)
- **Standards**: ERC-6093 custom errors, EIP-1193 RPC codes, Solidity panic codes
- **Solana**: Jupiter aggregator, Whirlpool, program errors, compute budget
- **Bitcoin**: UTXO errors, PSBT signing, transaction validation
- **Validation**: Input validation errors, parameter requirements, address validation
- **Additional RPC**: Extended RPC error codes (-32009 to -32015, -32612, -32613)

## License

MIT © [halilatilla](https://github.com/halilatilla)
