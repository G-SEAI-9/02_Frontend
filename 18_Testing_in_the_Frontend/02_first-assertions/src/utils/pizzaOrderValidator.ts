/**
 * Validates a pizza order to ensure it meets restaurant requirements
 * @param pizzaSize - Size of the pizza ('small', 'medium', 'large')
 * @param toppings - Array of toppings
 * @param customerAge - Age of the customer
 * @returns Object with isValid boolean and error message if invalid
 */
export function validatePizzaOrder(
  pizzaSize: string,
  toppings: string[],
  customerAge: number
): { isValid: boolean; error?: string } {
  // Check if pizza size is valid
  if (!['small', 'medium', 'large'].includes(pizzaSize)) {
    return { isValid: false, error: 'Invalid pizza size' };
  }
  // Check if customer is old enough (must be at least 5 years old)
  if (customerAge < 5) {
    return { isValid: false, error: 'Customer too young' };
  }
  // Check if toppings count is reasonable (max 10 toppings)
  if (toppings.length > 10) {
    return { isValid: false, error: 'Too many toppings' };
  }
  // Check for conflicting toppings (pineapple and anchovies don't go together!)
  if (toppings.includes('pineapple') && toppings.includes('ham')) {
    return { isValid: false, error: 'Pineapple and ham cannot be combined' };
  }
  return { isValid: true };
}
