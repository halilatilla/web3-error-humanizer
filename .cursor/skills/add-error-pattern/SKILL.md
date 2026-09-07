---
name: add-error-pattern
description: Add or retag a Web3 / DEX error pattern in the local dictionary. Use when the user has a raw RPC, wallet, or protocol error string, a missing toast, a wrong category, or asks to add/update patterns.
---

# Add an error pattern

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md). Test against public APIs (`humanizeError`, `humanizeErrorDetailed`, `classifyError`), not matcher internals.

## Workflow

1. Capture the **exact** error string, protocol/wallet, and cause (slippage, funds, rejection, …).
2. Pick the file under `src/data/patterns/`:

   | Source | File |
   | --- | --- |
   | EVM / Uniswap / Aave / generic ERC-20 | `evm.ts` |
   | Solana programs / wallets | `solana.ts` |
   | Tron / energy | `tron.ts` |
   | TON / Sui / BTC | `ton.ts` / `sui.ts` / `btc.ts` |
   | MetaMask, WalletConnect, AppKit | `wallets.ts` |
   | Bridges / Li.Fi | `bridges.ts` |
   | Cross-DEX swap copy | `swap-common.ts` |
   | Truly generic | `generic.ts` |

3. Add a `{ message, category }` object. Optional `chain` is applied in `src/data/error-map.ts` via `withChain`, not on most file entries.

```typescript
INSUFFICIENT_OUTPUT_AMOUNT: {
  message: "Price moved. Increase slippage or try a smaller amount.",
  category: "slippage",
},
```

4. Do **not** add generic single-word keys (`revert`, `timeout`, `error`). Those are dropped or exact-only.
5. Category CTA check:
   - Low pool depth → `liquidity`, not `slippage`
   - Tron energy → `gas`
   - Solana `InstructionError` / program id → `contract_error`, not `wallet_connection`
   - User cancelled / denied → `user_rejection`, not `signature`
6. Message rules: no jargon, say why + what to do, one sentence, end with a period.
7. Add a focused test in `src/matching.test.ts` or `src/patterns.test.ts`:

```typescript
it("should handle YourProtocol error", () => {
  const result = humanizeErrorDetailed(new Error("YOUR_ERROR_KEY"));
  expect(result.source).toBe("local");
  expect(result.category).toBe("slippage");
});
```

8. Verify: `npm run test:run` and `npm run lint`.
9. Commit with `feat: add <protocol> error patterns` (or `fix:` if retagging / copy-only).
