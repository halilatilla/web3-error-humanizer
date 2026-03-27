---
name: Bug Report
about: Report a bug or incorrect behavior
title: "bug: "
labels: bug
assignees: ""
---

## Describe the Bug

A clear description of what the bug is.

## To Reproduce

```typescript
// Minimal code to reproduce
import { humanizeError } from "web3-error-humanizer";

const error = new Error("...");
const result = humanizeError(error);
// Expected: "..."
// Actual: "..."
```

## Expected Behavior

What you expected to happen.

## Environment

- **Package version:** (e.g., 1.1.1)
- **Node.js version:** (e.g., 20.x)
- **Runtime:** (Node.js / Browser / Bun / Deno)
- **Bundler:** (webpack / vite / esbuild / none)
