/**
 * Local test script for web3-error-humanizer
 *
 * Run with: npx tsx examples/test-local.ts
 *
 * Note: Set OPENAI_API_KEY environment variable for AI fallback tests
 */

import { Web3ErrorHumanizer, LOCAL_ERROR_MAP } from "../src/index";

// Test without API key (local dictionary only)
async function testLocalDictionary() {
  console.log("\n📖 Testing Local Dictionary (no API key needed)\n");
  console.log("─".repeat(60));

  // Create humanizer with dummy key (won't be used for local matches)
  const humanizer = new Web3ErrorHumanizer({
    openaiApiKey: "test-key",
  });

  const testCases = [
    { error: new Error("INSUFFICIENT_FUNDS"), expected: "local match" },
    { error: new Error("User ACTION_REJECTED"), expected: "local match" },
    { error: new Error("INSUFFICIENT_OUTPUT_AMOUNT"), expected: "local match" },
    { error: { reason: "TRANSFER_FROM_FAILED" }, expected: "local match" },
    { error: { data: { message: "Pancake: K" } }, expected: "local match" },
  ];

  for (const { error } of testCases) {
    const errorStr =
      error instanceof Error ? error.message : JSON.stringify(error);
    const result = await humanizer.humanize(error);
    console.log(`❌ ${errorStr}`);
    console.log(`✅ ${result}`);
    console.log();
  }
}

// Test with real API key (AI fallback)
async function testAIFallback() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log("\n⚠️  Skipping AI tests (set OPENAI_API_KEY to enable)\n");
    return;
  }

  console.log("\n🤖 Testing AI Fallback\n");
  console.log("─".repeat(60));

  const humanizer = new Web3ErrorHumanizer({
    openaiApiKey: apiKey,
  });

  const unknownError = new Error("execution reverted: UniswapV2: LOCKED");

  console.log(`❌ ${unknownError.message}`);
  const result = await humanizer.humanize(unknownError, {
    fromToken: "ETH",
    toToken: "USDC",
    slippage: "0.5%",
  });
  console.log(`✅ ${result}`);
}

// Show all local error mappings
function showLocalMappings() {
  console.log("\n📚 Local Error Mappings\n");
  console.log("─".repeat(60));

  for (const [key, value] of Object.entries(LOCAL_ERROR_MAP)) {
    console.log(`"${key}"`);
    console.log(`  → ${value}\n`);
  }
}

// Run tests
async function main() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           web3-error-humanizer - Local Test                ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  showLocalMappings();
  await testLocalDictionary();
  await testAIFallback();

  console.log("─".repeat(60));
  console.log("✨ All tests completed!\n");
}

main().catch(console.error);
