/**
 * Calculates the total bill for a group dining experience including tip
 * @param itemPrices - Array of individual item prices
 * @param tipPercentage - Tip percentage (e.g., 18 for 18%)
 * @param splitBetween - Number of people to split the bill between
 * @returns Object with total bill, tip amount, and amount per person
 */
export type BillCalculation = {
  subtotal: number;
  tipAmount: number;
  total: number;
  perPerson: number;
};

export function calculateGroupBill(
  itemPrices: number[],
  tipPercentage: number,
  splitBetween: number
): BillCalculation {
  if (splitBetween <= 0) {
    throw new Error('Cannot split bill between 0 or negative people');
  }

  if (itemPrices.some(price => price < 0)) {
    throw new Error('Item prices cannot be negative');
  }

  const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);
  const tipAmount = subtotal * (tipPercentage / 100);
  const total = subtotal + tipAmount;
  const perPerson = total / splitBetween;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tipAmount: Math.round(tipAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100
  };
}
