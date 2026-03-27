# Contributing to web3-error-humanizer

Thanks for your interest in contributing! The most valuable contribution is **adding new error patterns** -- the more errors the library recognizes, the more useful it is for everyone.

## Adding Error Patterns

### 1. Find the error

When you encounter a Web3 error that isn't covered, note down:
- The **exact error string** (e.g., `"UniswapV2: K"`, `"INSUFFICIENT_OUTPUT_AMOUNT"`, `4001`)
- Which **protocol/wallet** produced it
- What **caused** it (slippage, insufficient funds, user rejection, etc.)

### 2. Add it to the error map

Open `src/data/error-map.ts` and add your entry to the appropriate section:

```typescript
// Find the right section (or create a new one)
// ============================================
// Your Protocol Name
// ============================================
"YOUR_ERROR_KEY": "A friendly, non-technical explanation of what happened and what to do.",
```

### Guidelines for error messages

- **No technical jargon** -- avoid terms like "reverted", "gas limit", "0x...", "nonce", "wei", "calldata"
- **Explain why** it happened (e.g., "low liquidity", "price changed")
- **Tell the user what to do** (e.g., "Try increasing your slippage tolerance")
- **Keep it short** -- one sentence, under 20 words if possible
- **End with a period**

### 3. Add a test

Add a focused test case in the relevant test file (`src/api.test.ts`, `src/extraction.test.ts`, `src/patterns.test.ts`, or `src/ai.test.ts`) to verify your pattern works:

```typescript
it("should handle YourProtocol error", () => {
  const result = humanizeError(new Error("YOUR_ERROR_KEY"));
  expect(result).toBe(LOCAL_ERROR_MAP["YOUR_ERROR_KEY"]);
});
```

### 4. Submit a PR

```bash
git checkout -b feat/add-your-protocol-errors
npm run test:run    # make sure tests pass
npm run lint        # make sure linting passes
git add .
git commit -m "feat: add YourProtocol error patterns"
git push origin feat/add-your-protocol-errors
```

## Development Setup

```bash
git clone https://github.com/halilatilla/web3-error-humanizer.git
cd web3-error-humanizer
npm install
npm run test        # run tests in watch mode
npm run build       # build the package
npm run lint        # check for linting errors
```

## Project Structure

```
src/
├── index.ts              # Local-only entry point (zero deps)
├── ai.ts                 # AI fallback entry point (requires openai)
├── types.ts              # TypeScript type definitions
├── data/
│   └── error-map.ts      # All 770+ built-in error patterns live here
└── utils/
    ├── extraction.ts     # Extract raw message from error objects
    ├── matching.ts       # Pattern matching engine (Map + substring)
    └── normalization.ts  # String normalization for matching
```

Custom patterns added with `addPattern()` / `addPatterns()` are process-wide. If you add them in tests, call `resetCustomPatterns()` in your setup/teardown so cases stay isolated.

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `npm run lint:fix` and `npm run format` before committing.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with semantic-release:

- `feat: ...` -- new error patterns, new features (triggers minor release)
- `fix: ...` -- bug fixes, message improvements (triggers patch release)
- `docs: ...` -- documentation only
- `chore: ...` -- maintenance, tooling

## Questions?

Open an issue or start a discussion on GitHub. We'd love to hear which errors you're encountering in the wild!
