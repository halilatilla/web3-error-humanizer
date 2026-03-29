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

  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s:._-]/gu, "");
}
