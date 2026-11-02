import { describe, expect, it, test } from 'vitest';
import { rollDice } from './rollDice';

const DICE_FACES = [1, 2, 3, 4, 5, 6];

describe('rollDice', { shuffle: true }, () => {
  test('should return as many rolls as dice were thrown', () => {
    // Arrage
    const count = 3;
    // act
    const result = rollDice(count);
    // expect(result.rolls.length).toBe(count);
    expect(result.rolls).toHaveLength(count);
  });

  test('total should be the sum of all rolls', () => {
    const result = rollDice(5);
    const sum = result.rolls.reduce((a, b) => a + b, 0);

    expect(result.total).toBe(sum);
  });
});

describe('verschiedene Matchers', () => {
  const result = rollDice(1);

  it('toBe compares primitive values (numbers, strings, booleans)', () => {
    expect(result.rolls.length).toBe(1);
    expect(result.total).not.toBe(0);
  });

  it('toEqual compares the CONTENT of objects and arrays', () => {
    expect({ rolls: [4], total: 4 }).toEqual({ rolls: [4], total: 4 });
    expect({ rolls: [4], total: 4 }).not.toBe({ rolls: [4], total: 4 });
  });

  it('toStrictEqual is stricter: properties that are undefined must match too', () => {
    const withExtra = { rolls: [4], total: 4, bonus: undefined };

    expect(withExtra).toEqual({ rolls: [4], total: 4 });
    expect(withExtra).not.toStrictEqual({ rolls: [4], total: 4 });
  });

  it('toMatchObject only checks the properties you list', () => {
    expect(rollDice(1, 2)).toMatchObject({ rolls: expect.any(Array) });
  });

  it('toBeTypeOf and toBeInstanceOf check what kind of value we got', () => {
    expect(result.total).toBeTypeOf('number');
    expect(result.rolls).toBeInstanceOf(Array);
  });

  it('toBeGreaterThanOrEqual / toBeLessThanOrEqual check ranges', () => {
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeLessThanOrEqual(6);
    expect(rollDice(10).total).toBeGreaterThan(9);
  });

  it('toBeOneOf checks that a value is one of a list of allowed values', () => {
    expect(result.total).toBeOneOf(DICE_FACES);
  });

  it('toContain checks that an array includes an item (or a string a substring)', () => {
    const rolls = rollDice(1000).rolls;
    expect(rolls).toContain(6);
  });

  it('toMatch checks a string against a regular expression', () => {
    const printed = rollDice(3).rolls.join(', ');
    expect(printed).toMatch(/^[1-6], [1-6], [1-6]$/);
  });

  it('toBeDefined / toBeUndefined / toBeNull check for "missing" values', () => {
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.rolls.find((roll) => roll > 6)).toBeUndefined();
  });

  it('toBeCloseTo compares decimal numbers that are not exactly equal', () => {
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});
