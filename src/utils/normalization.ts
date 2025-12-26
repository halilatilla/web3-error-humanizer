/**
 * Normalize error message for matching
 * - Converts to lowercase
 * - Trims whitespace
 * - Normalizes unicode
 * - Handles special characters
 */
export function normalize(value: string): string {
  if (!value || typeof value !== "string") {
    return "";
  }

  return (
    value
      .trim()
      .toLowerCase()
      .normalize("NFD") // Decompose unicode characters
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: We want to remove combining diacritical marks
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/\s+/g, " ") // Normalize whitespace
      .replace(/[^\w\s:._-]/g, "")
  ); // Remove special characters except common separators
}
