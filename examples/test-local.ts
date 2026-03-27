/**
 * Local test script for web3-error-humanizer
 *
 * Run with: npx tsx examples/test-local.ts
 *
 * Note: Set OPENAI_API_KEY environment variable for AI fallback tests
 */

import { Web3ErrorHumanizer } from "../src/ai";
import {
  LOCAL_ERROR_MAP,
  classifyError,
  getErrorSeverity,
  getLocalErrorCount,
  getSuggestion,
  humanizeErrorDetailed,
  isRecoverable,
} from "../src/index";

// Test the toolkit API
function testToolkitAPI() {
  console.log("\n🛠️  Testing Toolkit API\n");
  console.log("─".repeat(60));

  const errors = [
    new Error("INSUFFICIENT_FUNDS"),
    new Error("ACTION_REJECTED"),
    new Error("INSUFFICIENT_OUTPUT_AMOUNT"),
    new Error("out of gas"),
    new Error("Chain mismatch"),
    new Error("execution reverted"),
  ];

  for (const error of errors) {
    const result = humanizeErrorDetailed(error);
    console.log(`❌ ${error.message}`);
    console.log(`  message:     ${result.message}`);
    console.log(`  category:    ${result.category}`);
    console.log(`  severity:    ${result.severity}`);
    console.log(`  suggestion:  ${result.suggestion}`);
    console.log(`  recoverable: ${result.recoverable}`);
    console.log(`  source:      ${result.source}`);
    console.log();
  }

  console.log(`Total patterns: ${getLocalErrorCount()}`);
  console.log();
}

// Test without API key (local dictionary only)
async function testLocalDictionary() {
  console.log("\n📖 Testing Local Dictionary (no API key needed)\n");
  console.log("─".repeat(60));

  const humanizer = new Web3ErrorHumanizer({
    openaiApiKey: "test-key",
  });

  const testCases = [
    { error: new Error("INSUFFICIENT_FUNDS") },
    { error: new Error("User ACTION_REJECTED") },
    { error: new Error("INSUFFICIENT_OUTPUT_AMOUNT") },
    { error: { reason: "TRANSFER_FROM_FAILED" } as unknown },
    { error: { data: { message: "Pancake: K" } } as unknown },
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

  testToolkitAPI();
  showLocalMappings();
  await testLocalDictionary();
  await testAIFallback();

  console.log("─".repeat(60));
  console.log("✨ All tests completed!\n");
}

main().catch(console.error);
