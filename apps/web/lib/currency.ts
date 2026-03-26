/**
 * Formata valor em centavos para BRL (ex: 450000 → "R$ 4.500,00")
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

/**
 * Converte string "4500,00" ou "4500.00" para centavos (450000)
 */
export function parseCurrencyToCents(value: string): number {
  const normalized = value.replace(/\./g, '').replace(',', '.')
  const float = parseFloat(normalized)
  if (isNaN(float)) return 0
  return Math.round(float * 100)
}

/**
 * Formata centavos para input controlado (ex: 450000 → "4500.00")
 */
export function centsToInputValue(cents: number): string {
  return (cents / 100).toFixed(2)
}
