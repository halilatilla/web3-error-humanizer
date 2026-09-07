---
name: release-npm
description: Publish web3-error-humanizer via GitHub Release + semantic-release. Use when the user asks to ship, publish, release, bump the npm version, or debug a failed Release workflow.
---

# Release to npm

Do **not** `npm publish` or bump `package.json` version locally. Versioning is owned by semantic-release on `main`.

## Happy path

1. Land changes with Conventional Commits (`feat:` minor, `fix:` patch, `docs:` / `chore:` no release).
2. Open a PR into `main`. Do not push a release commit by hand.
3. Merge the PR. [`.github/workflows/release.yml`](../../../.github/workflows/release.yml) runs `npx semantic-release` after `npm run test:run` and `npm run build`.
4. Confirm (npm website can lag):

```bash
npm view web3-error-humanizer version
gh release view --json tagName,url
```

## Secrets and branch protection

- `NPM_TOKEN` must be a valid npm granular token with publish rights for `web3-error-humanizer`. `EINVALIDNPMTOKEN` means rotate the Actions secret.
- `@semantic-release/git` pushes `chore(release): x.y.z [skip ci]` to `main` (updates `package.json` + `CHANGELOG.md`).
- If that push is rejected, `main` is still requiring a PR (or admins are enforced). Allow GitHub Actions to bypass, or drop “PR required” for the release bot. Then re-run the failed Release workflow — do not cut a new version commit by hand.

## Local checks only

```bash
npm run test:run
npm run lint
npm run build
npm run release:dry
```

`release:dry` needs Node.js >= 22.14. Never run `npm run release` against real npm from a laptop unless the user explicitly asks.
