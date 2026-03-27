## [2.3.1](https://github.com/halilatilla/web3-error-humanizer/compare/v2.3.0...v2.3.1) (2026-03-27)


### Bug Fixes

* harden matching flow and polish package release surface ([0f7df16](https://github.com/halilatilla/web3-error-humanizer/commit/0f7df16cf301b8e9d53e723807434183519aaf8b))

# [2.3.0](https://github.com/halilatilla/web3-error-humanizer/compare/v2.2.0...v2.3.0) (2026-03-27)


### Features

* transform into developer toolkit with structured error classification ([451b9b2](https://github.com/halilatilla/web3-error-humanizer/commit/451b9b20f1f1ec5c8e9c86de03590d439f009690))

# [2.2.0](https://github.com/halilatilla/web3-error-humanizer/compare/v2.1.0...v2.2.0) (2026-03-27)


### Features

* add 154 error patterns (Uniswap V4, Compound V3, Aave V3, WalletConnect v2, Solana, panic codes, OpenZeppelin) ([788ed66](https://github.com/halilatilla/web3-error-humanizer/commit/788ed6669ecaa1abeccbc61c429e269c6594f19f))

# [2.1.0](https://github.com/halilatilla/web3-error-humanizer/compare/v2.0.0...v2.1.0) (2026-03-27)


### Features

* add 19 viem error class name patterns ([813befe](https://github.com/halilatilla/web3-error-humanizer/commit/813befe44273f019b84cb11909d3deea7c87c574))

# [2.0.0](https://github.com/halilatilla/web3-error-humanizer/compare/v1.1.1...v2.0.0) (2026-03-27)


* feat!: zero-dependency core, split AI into separate entry point ([620bc66](https://github.com/halilatilla/web3-error-humanizer/commit/620bc66242a69b9577412041a496d7f4bd9e61bc))


### BREAKING CHANGES

* Web3ErrorHumanizer class moved from 'web3-error-humanizer' to 'web3-error-humanizer/ai'. openai and viem are now optional peer dependencies instead of hard dependencies.

- Remove openai and viem from dependencies, move to optional peerDependencies
- Split into two entry points: local-only (zero deps) and /ai (OpenAI fallback)
- Use duck-typing for viem error detection instead of direct import
- Use dynamic import() for OpenAI SDK, loaded only when needed
- Add addPattern()/addPatterns() API for runtime extensibility
- Remove dangerouslyAllowBrowser: true from OpenAI constructor
- Remove process.env.NODE_ENV checks that crash in browsers
- Fix unused OpenAI import in types.ts
- Add LICENSE file, CONTRIBUTING.md, GitHub issue templates
- Add 18 npm keywords for discoverability
- Rewrite README with before/after section, mermaid diagram, bundlephobia badge

## [1.1.1](https://github.com/halilatilla/web3-error-humanizer/compare/v1.1.0...v1.1.1) (2025-12-26)


### Bug Fixes

* reduce package size by 66% (remove sourcemaps, add minification) ([ed9cd41](https://github.com/halilatilla/web3-error-humanizer/commit/ed9cd4183aa3433484c98e1d52cd9329ebc1506a))

## [1.1.0](https://github.com/halilatilla/web3-error-humanizer/compare/v1.0.0...v1.1.0) (2025-12-26)


### Features

* add hasLocalPattern and getLocalPatterns helper functions ([0208bdc](https://github.com/halilatilla/web3-error-humanizer/commit/0208bdc05904452c571dde2e9ac6a544d2790920))

## 1.0.0 (2025-12-26)


### Features

* add 100+ wallet error patterns for Solana, TON, Tron, Sui, Aptos ([ba4e45b](https://github.com/halilatilla/web3-error-humanizer/commit/ba4e45b049a628b5f917ef77e9c5c6950f1ca40c))
