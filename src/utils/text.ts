export function truncateText(text: string, max = 250): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}
