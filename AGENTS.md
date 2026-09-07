# Agent notes

This is a **TypeScript npm library**, not a Next.js app. Use **npm**, never yarn.

## Rules

- [`.cursor/rules/library.mdc`](.cursor/rules/library.mdc) — always-on library constraints
- [`.cursor/rules/error-patterns.mdc`](.cursor/rules/error-patterns.mdc) — dictionaries under `src/data/patterns/`
- [`.cursor/rules/matching.mdc`](.cursor/rules/matching.mdc) — scored matcher and extraction

## Skills

- [`.cursor/skills/add-error-pattern`](.cursor/skills/add-error-pattern) — add or retag a pattern
- [`.cursor/skills/release-npm`](.cursor/skills/release-npm) — ship via semantic-release, not `npm publish`

## Verify

```bash
npm run test:run
npm run lint
npm run build
```

Public seams: `humanizeError`, `humanizeErrorDetailed`, `createHumanizer`, `classifyError`. Prefer `createHumanizer()` over process-wide `addPattern()`. Do not bump `package.json` version.
