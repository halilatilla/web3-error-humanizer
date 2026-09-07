# Framework Examples

## Wagmi / viem (recommended default)

Keep this on the client. No API key.

```typescript
import { humanizeErrorDetailed } from "web3-error-humanizer";

try {
  await walletClient.writeContract({ /* ... */ });
} catch (error) {
  const result = humanizeErrorDetailed(error);

  toast.error(result.message);

  if (result.category === "insufficient_allowance") {
    openApprove();
  } else if (result.category === "chain_mismatch") {
    openSwitchNetwork();
  } else if (result.recoverable) {
    showRetry();
  }
}
```

## Next.js / React with an isolated instance

```typescript
// lib/humanize-error.ts
import { createHumanizer } from "web3-error-humanizer";

const humanizer = createHumanizer({
  chain: "evm",
  fallbackMessage: "Swap failed. Please try again.",
});

export function humanizeSwapError(error: unknown) {
  return humanizer.humanizeDetailed(error);
}
```

```tsx
"use client";
import { humanizeSwapError } from "@/lib/humanize-error";

export function SwapButton() {
  const handleSwap = async () => {
    try {
      await contract.write.swap([...]);
    } catch (err) {
      const result = humanizeSwapError(err);
      toast.error(result.message);
    }
  };
}
```

## Optional AI (server only, never on swap confirm)

Unknown errors can stay on the generic fallback. If you still want AI for support tools, keep the key on the server:

**1. API route (`app/api/humanize-error/route.ts`):**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Web3ErrorHumanizer } from "web3-error-humanizer/ai";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  const { errorMessage, context } = await request.json();
  const message = await humanizer.humanize(new Error(errorMessage), context);
  return NextResponse.json({ message });
}
```

**2. Client helper:**

```typescript
import { humanizeErrorDetailed, humanizeErrorLocal } from "web3-error-humanizer";

export async function humanizeSwapError(error: unknown) {
  const local = humanizeErrorDetailed(error);
  if (local.source !== "fallback") {
    return local.message;
  }

  const errorMessage = humanizeErrorLocal(error) ?? String(
    error instanceof Error ? error.message : error
  );

  const response = await fetch("/api/humanize-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ errorMessage }),
  });

  const data = await response.json();
  return data.message;
}
```

Never expose an OpenAI API key in the browser.

## i18n

The package ships English strings. Map structured fields in your app:

```typescript
const result = humanizeErrorDetailed(error);
const message = t(`errors.${result.category}`, {
  defaultValue: result.message,
});
```

## Node.js Backend

```typescript
import { createHumanizer } from "web3-error-humanizer";

const humanizer = createHumanizer({
  fallbackMessage: "Swap failed. Please try again.",
});

app.post("/api/swap", async (req, res) => {
  try {
    const result = await executeSwap(req.body);
    res.json({ success: true, result });
  } catch (error) {
    const result = humanizer.humanizeDetailed(error);
    res.status(400).json({ success: false, message: result.message });
  }
});
```

## CommonJS

```javascript
const { humanizeError, createHumanizer } = require("web3-error-humanizer");
```
