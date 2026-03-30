# Framework Examples

## Next.js / React (Secure - Recommended)

**Security Note:** Never expose your OpenAI API key in the browser. Use a server-side API route:

**1. Create API Route (`app/api/humanize-error/route.ts`):**

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

**2. Create Client Helper:**

```typescript
// lib/humanize-error.ts
import { humanizeError } from "web3-error-humanizer";

export async function humanizeSwapError(error: unknown, context?: SwapContext) {
  // Try local match first (instant, no network)
  const localResult = humanizeError(error);
  if (localResult !== "Transaction failed. Please try again.") {
    return localResult;
  }

  // Fall back to AI via server
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
import { humanizeSwapError } from "@/lib/humanize-error";

export function SwapButton() {
  const handleSwap = async () => {
    try {
      await contract.write.swap([...]);
    } catch (err) {
      const message = await humanizeSwapError(err, {
        fromToken: "ETH",
        toToken: "USDC",
      });
      toast.error(message);
    }
  };
}
```

## Node.js Backend

```typescript
import { Web3ErrorHumanizer } from "web3-error-humanizer/ai";

const humanizer = new Web3ErrorHumanizer({
  openaiApiKey: process.env.OPENAI_API_KEY!,
  aiModel: "gpt-4-turbo",
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

## CommonJS

```javascript
const { humanizeError } = require("web3-error-humanizer");

// Or with AI:
// const { Web3ErrorHumanizer } = require("web3-error-humanizer/ai");
```
