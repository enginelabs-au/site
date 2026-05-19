/** Deterministic AUD formatting (avoids locale hydration mismatches). */
export function formatAud(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
