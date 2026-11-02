// Derselbe Test wie in sum.testintro.ts, jetzt mit Vitest.
// Vitest findet automatisch alle Dateien, die auf .test.ts enden, und führt sie aus (npm test).
import { expect, test, it } from 'vitest';
import { sum } from './sum';

// test(name, fn) definiert einen einzelnen Testfall.
// Der Name erscheint in der Ausgabe – er sollte beschreiben, was erwartet wird.
test('sum() should add two numbers', () => {
  // Arrange
  const input = {
    a: 5,
    b: 7,
  };
  const expectedOutput = 12;
  // Act
  const actualOutput = sum(input.a, input.b);

  // Assert: expect(tatsächlich).toBe(erwartet) ersetzt unser if + throw von Hand.
  // Schlägt der Vergleich fehl, meldet Vitest den Test als rot – mit erwartetem und tatsächlichem Wert.
  expect(actualOutput).toBe(expectedOutput);
});

// it() ist nur ein anderer Name für test() – so liest sich der Name wie ein Satz: "it should ..."
// Bei einfachen Fällen passen Arrange, Act und Assert auch in eine Zeile.
it('should add 4 and 8 to 12', () => {
  expect(sum(4, 8)).toBe(12);
});
