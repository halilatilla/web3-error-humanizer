# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2024

### Added
- Biome.js configuration for linting and formatting (replaces ESLint and Prettier)
- Enhanced error extraction supporting error chains, nested errors, and more error types
- Improved normalization function with unicode handling and special character normalization
- Optimized matching algorithm using lookup maps (O(1) for exact matches vs O(n) before)
- Retry logic for AI API calls with exponential backoff for rate limits
- Better error handling with try-catch blocks throughout
- Input validation to prevent edge case failures
- Development-mode console warnings for debugging

### Changed
- **Performance**: Matching algorithm now uses Map-based lookups for O(1) exact matches
- **Robustness**: Error extraction now handles null/undefined, error chains, nested errors, and strings
- **AI Error Handling**: Added retry logic with exponential backoff for rate limit errors
- **Normalization**: Enhanced to handle unicode characters, diacritics, and special characters

### Technical Details

#### Performance Improvements
- Exact code matches: O(1) using `Map` lookup (was O(n))
- Exact phrase matches: O(1) using `Map` lookup (was O(n))
- Substring matches: Still O(n) but optimized with pre-sorted entries

#### Error Extraction Enhancements
- Supports error.cause (Error chaining)
- Handles nested error objects (error.error)
- Better handling of null/undefined inputs
- Supports string errors directly
- More robust JSON.stringify fallback

#### Normalization Improvements
- Unicode normalization (NFD)
- Diacritic removal
- Whitespace normalization
- Special character handling

### Scripts Added
- `npm run lint` - Check for linting errors (Biome)
- `npm run lint:fix` - Auto-fix linting errors (Biome)
- `npm run format` - Format code with Biome
- `npm run format:check` - Check code formatting (Biome)

### Changed
- **Tooling**: Replaced ESLint and Prettier with Biome.js for faster, unified linting and formatting

### Dependencies Added
- `@biomejs/biome` - Fast formatter and linter (replaces ESLint + Prettier)

---

## [1.0.0] - Initial Release

### Features
- 170+ local error patterns
- Optional AI fallback using OpenAI
- viem integration for error extraction
- Dual module support (ESM & CommonJS)
- TypeScript definitions

