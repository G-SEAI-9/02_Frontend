// Tests for pizzaOrderValidator function
// This function validates pizza orders based on size, toppings, and customer age

import { describe, it, expect } from 'vitest';
import { validatePizzaOrder } from './pizzaOrderValidator';

describe('validatePizzaOrder', () => {
  // Test valid pizza orders
  const VALID_OUTPUT = { isValid: true };

  describe('Test valid pizza orders', () => {
    // - Should return { isValid: true } for valid combinations
    it('Should return { isValid: true } for valid combinations', () => {
      // arrange
      // act
      const result = validatePizzaOrder('medium', ['cheese'], 21);
      // assert
      expect(result).toEqual(VALID_OUTPUT);
    });

    // - Test with different valid sizes: 'small', 'medium', 'large'
    it.for(['small', 'medium', 'large'])('should accept size %s', (size) => {
      expect(validatePizzaOrder(size, ['cheese'], 21)).toEqual(VALID_OUTPUT);
    });

    // - Test with case variations: 'SMALL', 'Medium', 'LarGe'
    it.skip.for(['SMALL', 'Medium', 'LarGe'])('should accept size with case variation %s', (size) => {
      expect(validatePizzaOrder(size, ['cheese'], 21)).toEqual(VALID_OUTPUT);
    });

    // - Test with various valid toppings arrays
    it.for([[], ['cheese'], ['mushrooms', 'spinach'], ['pineapple']])('should accept toppings %s', (toppings) => {
      expect(validatePizzaOrder('medium', toppings, 21)).toEqual(VALID_OUTPUT);
    });
    // - Test with customers of different valid ages (5, 16, 25, 65)
    it.for([5, 16, 25, 65])('should accept valid customer ages %s', (age) => {
      expect(validatePizzaOrder('medium', ['cheese'], age)).toEqual(VALID_OUTPUT);
    });
  });
  // ------------------------------
  // Test invalid pizza sizes
  describe('Test invalid pizza sizes', () => {
    const INVALID_SIZE = {
      error: 'Invalid pizza size',
      isValid: false,
    };

    // - Should return error for invalid sizes like 'tiny', 'huge', 'extra-large'
    it.for(['tiny', 'huge', 'extra-large'])('Should return error for invalid sizes %s', (size) => {
      expect(validatePizzaOrder(size, ['cheese'], 21)).toEqual(INVALID_SIZE);
    });
    // - Should return error for empty string size
    it('Should return error for empty string size', () => {
      expect(validatePizzaOrder('', ['cheese'], 21)).toEqual(INVALID_SIZE);
    });

    // - Should return error for null/undefined size
    it.for([undefined, null])('Should return error for invalid sizes %s', (size) => {
      expect(validatePizzaOrder(size as unknown as string, ['cheese'], 21)).toEqual(INVALID_SIZE);
    });
  });
  // ------------------------------

  // Test customer age validation
  describe('Test customer age validation', () => {
    const TOO_YOUNG = {
      error: 'Customer too young',
      isValid: false,
    };
    // - Should return error for customers under 5 years old
    it.for([0, 1, 2, 3, 4])('should reject customer age %s', (age) => {
      expect(validatePizzaOrder('medium', ['cheese'], age)).toEqual(TOO_YOUNG);
    });

    // - Should return error for negative ages
    it('should reject negative customer age', () => {
      expect(validatePizzaOrder('medium', ['cheese'], -1)).toEqual(TOO_YOUNG);
    });
  });
  // ------------------------------
  // Test toppings validation
  describe('Test toppings validation', () => {
    // - Should return error when more than 10 toppings are provided
    it('should return error when more than 10 toppings', () => {
      const toppings = [
        'spinach',
        'wiener würstchen',
        'onions',
        'cheese',
        'mozarella',
        'mushrooms',
        'tomatoes',
        'garlic',
        'salami',
        'tofu',
        'broccoli',
      ];
      expect(validatePizzaOrder('medium', toppings, 21)).toEqual({
        error: 'Too many toppings',
        isValid: false,
      });
    });
    // - Should return error when both 'pineapple' and 'ham' are included
    it("should return error when both 'pineapple' and 'ham' are included", () => {
      const toppings = [
        'spinach',
        'wiener würstchen',
        'onions',
        'ham',
        'cheese',
        'mozarella',
        'mushrooms',
        'tomatoes',
        'pineapple',
      ];
      expect(validatePizzaOrder('medium', toppings, 21)).toEqual({
        error: 'Pineapple and ham cannot be combined',
        isValid: false,
      });
    });
    // - Should accept empty toppings array

    // - Should accept exactly 10 toppings (boundary test)
    it("should return error when both 'pineapple' and 'ham' are included", () => {
      const toppings = [
        'spinach',
        'wiener würstchen',
        'onions',
        'tofu',
        'smoked tofu',
        'cheese',
        'mozarella',
        'mushrooms',
        'tomatoes',
        'pineapple',
      ];
      expect(validatePizzaOrder('medium', toppings, 21)).toEqual(VALID_OUTPUT);
    });
  });
  // ------------------------------
  // Test edge cases
  describe('Test edge cases', () => {
    // - What happens with unusual but valid inputs?
    it('should accept duplicate toppings', () => {
      expect(validatePizzaOrder('medium', ['cheese', 'cheese', 'cheese', 'cheese'], 21)).toEqual(VALID_OUTPUT);
    });

    // - Test with special characters in toppings
    it('should accept toppings with special characters', () => {
      expect(validatePizzaOrder('medium', ['jalapeño', 'sun-dried tomatoes'], 21)).toEqual(VALID_OUTPUT);
    });
    // - Test with very large customer ages

    it.for([99, 110, 150, Number.MAX_SAFE_INTEGER])('should accept very large age of %s', (age) => {
      expect(validatePizzaOrder('medium', ['cheese'], age)).toEqual(VALID_OUTPUT);
    });
  });
});
