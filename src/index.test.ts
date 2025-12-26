import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Web3ErrorHumanizer, LOCAL_ERROR_MAP, HumanizerConfig, SwapContext } from './index';

// Mock OpenAI
const mockCreate = vi.fn().mockResolvedValue({
  choices: [{ message: { content: 'AI generated response' } }]
});

vi.mock('openai', () => {
  return {
    OpenAI: class MockOpenAI {
      chat = {
        completions: {
          create: mockCreate
        }
      };
      constructor() {}
    }
  };
});

describe('Web3ErrorHumanizer', () => {
  let humanizer: Web3ErrorHumanizer;
  const mockConfig: HumanizerConfig = {
    openaiApiKey: 'test-api-key',
    aiModel: 'gpt-4o-mini'
  };

  beforeEach(() => {
    mockCreate.mockClear();
    humanizer = new Web3ErrorHumanizer(mockConfig);
  });

  describe('Local Dictionary Matching', () => {
    it('should return local message for INSUFFICIENT_FUNDS error', async () => {
      const error = new Error('INSUFFICIENT_FUNDS');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['INSUFFICIENT_FUNDS']);
    });

    it('should return local message for ACTION_REJECTED error', async () => {
      const error = new Error('User ACTION_REJECTED the transaction');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['ACTION_REJECTED']);
    });

    it('should return local message for EXPIRED error', async () => {
      const error = new Error('Transaction EXPIRED');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['EXPIRED']);
    });

    it('should return local message for INSUFFICIENT_OUTPUT_AMOUNT error', async () => {
      const error = new Error('INSUFFICIENT_OUTPUT_AMOUNT');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['INSUFFICIENT_OUTPUT_AMOUNT']);
    });

    it('should return local message for TRANSFER_FROM_FAILED error', async () => {
      const error = new Error('TRANSFER_FROM_FAILED');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['TRANSFER_FROM_FAILED']);
    });

    it('should return local message for Pancake: K error', async () => {
      const error = new Error('Pancake: K');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['Pancake: K']);
    });
  });

  describe('Error Message Extraction', () => {
    it('should extract message from standard Error object', async () => {
      const error = new Error('INSUFFICIENT_FUNDS: not enough ETH');
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['INSUFFICIENT_FUNDS']);
    });

    it('should extract reason from ethers-style error', async () => {
      const error = { reason: 'INSUFFICIENT_FUNDS' };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['INSUFFICIENT_FUNDS']);
    });

    it('should extract message from nested data object', async () => {
      const error = { data: { message: 'INSUFFICIENT_OUTPUT_AMOUNT' } };
      const result = await humanizer.humanize(error);
      expect(result).toBe(LOCAL_ERROR_MAP['INSUFFICIENT_OUTPUT_AMOUNT']);
    });

    it('should handle null/undefined gracefully', async () => {
      const result = await humanizer.humanize(null);
      // Should fallback to AI since JSON.stringify(null) won't match any local error
      expect(result).toBe('AI generated response');
    });
  });

  describe('AI Fallback', () => {
    it('should call AI for unknown errors', async () => {
      const error = new Error('Unknown blockchain error XYZ123');
      const result = await humanizer.humanize(error);
      expect(result).toBe('AI generated response');
    });

    it('should pass context to AI', async () => {
      const error = new Error('Unknown error');
      const context: SwapContext = {
        fromToken: 'USDC',
        toToken: 'ETH',
        slippage: '0.5%'
      };
      const result = await humanizer.humanize(error, context);
      expect(result).toBe('AI generated response');
    });
  });

  describe('Configuration', () => {
    it('should use default model when not specified', () => {
      const config: HumanizerConfig = { openaiApiKey: 'test-key' };
      const h = new Web3ErrorHumanizer(config);
      expect(h).toBeInstanceOf(Web3ErrorHumanizer);
    });

    it('should allow custom AI model', () => {
      const config: HumanizerConfig = { 
        openaiApiKey: 'test-key',
        aiModel: 'gpt-4-turbo'
      };
      const h = new Web3ErrorHumanizer(config);
      expect(h).toBeInstanceOf(Web3ErrorHumanizer);
    });
  });
});

describe('LOCAL_ERROR_MAP', () => {
  it('should contain all expected error keys', () => {
    const expectedKeys = [
      'INSUFFICIENT_FUNDS',
      'ACTION_REJECTED',
      'EXPIRED',
      'INSUFFICIENT_OUTPUT_AMOUNT',
      'TRANSFER_FROM_FAILED',
      'Pancake: K'
    ];
    
    expectedKeys.forEach(key => {
      expect(LOCAL_ERROR_MAP).toHaveProperty(key);
      expect(typeof LOCAL_ERROR_MAP[key]).toBe('string');
    });
  });

  it('should have user-friendly messages (no technical jargon)', () => {
    const technicalTerms = ['0x', 'revert', 'nonce', 'wei', 'gwei'];
    
    Object.values(LOCAL_ERROR_MAP).forEach(message => {
      technicalTerms.forEach(term => {
        expect(message.toLowerCase()).not.toContain(term.toLowerCase());
      });
    });
  });
});
