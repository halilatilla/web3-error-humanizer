# Contributing to web3-error-humanizer

Thanks for your interest in contributing! The most valuable contribution is **adding new error patterns** -- the more errors the library recognizes, the more useful it is for everyone.

## Adding Error Patterns

### 1. Find the error

When you encounter a Web3 error that isn't covered, note down:
- The **exact error string** (e.g., `"UniswapV2: K"`, `"INSUFFICIENT_OUTPUT_AMOUNT"`, `4001`)
- Which **protocol/wallet** produced it
- What **caused** it (slippage, insufficient funds, user rejection, etc.)

### 2. Add it to the right protocol file

Patterns live under `src/data/patterns/`. Add the entry to the matching file (`evm.ts`, `solana.ts`, `wallets.ts`, `generic.ts`, `swap-common.ts`, ...):

```typescript
YOUR_ERROR_KEY: {
  message: "A friendly, non-technical explanation of what happened and what to do.",
  category: "slippage",
},
```

`src/data/error-map.ts` merges those files, applies category overrides, and tags chain-specific maps.

### Guidelines for error messages

- **No technical jargon** -- avoid terms like "reverted", "gas limit", "0x...", "nonce", "wei", "calldata"
- **Explain why** it happened (e.g., "low liquidity", "price changed")
- **Tell the user what to do** (e.g., "Try increasing your slippage tolerance")
- **Keep it short** -- one sentence, under 20 words if possible
- **End with a period**
- **Do not add generic single words** (`revert`, `timeout`, `error`) as substring patterns

### 3. Add a test

Add a focused test case in the relevant test file (`src/api.test.ts`, `src/matching.test.ts`, `src/patterns.test.ts`, or `src/create-humanizer.test.ts`):

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

The published package supports Node.js >= 20. Running `semantic-release` locally or in CI needs Node.js >= 22.14.

## Project Structure

```
src/
├── index.ts              # Local-only entry point (zero deps)
├── create-humanizer.ts   # Isolated createHumanizer() factory
├── ai.ts                 # AI fallback entry point (requires openai)
├── types.ts              # TypeScript type definitions
├── data/
│   ├── error-map.ts      # Merges protocol files into the built-in registry
│   ├── category-meta.ts  # Severity / suggestion / recoverability
│   └── patterns/         # Protocol dictionaries (evm, solana, wallets, ...)
└── utils/
    ├── extraction.ts     # Extract raw message from error objects
    ├── matching.ts       # Scored matching engine
    └── normalization.ts  # String normalization for matching
```

`addPattern()` / `addPatterns()` are process-wide. Prefer `createHumanizer({ patterns })` in apps and tests. If you still mutate the singleton, call `resetCustomPatterns()` in setup/teardown so the lookup index is rebuilt.

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
