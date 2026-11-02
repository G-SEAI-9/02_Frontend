import { expect, test, it } from 'vitest';
import { sum } from './sum';

test('sum() should add two numbers', () => {
  const input = {
    a: 5,
    b: 7,
  };
  const expectedOutput = 12;
  const actualOutput = sum(input.a, input.b);

  expect(actualOutput).toBe(expectedOutput);
});

it('should add 4 and 8 to 12', () => {
  expect(sum(4, 8)).toBe(12);
});
