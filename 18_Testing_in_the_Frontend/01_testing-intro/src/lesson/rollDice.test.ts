import { describe, expect, it, test } from 'vitest';
import { rollDice } from './rollDice';

// Alle erlaubten Augenzahlen eines normalen Würfels
const DICE_FACES = [1, 2, 3, 4, 5, 6];

// describe() fasst zusammengehörige Tests zu einer Gruppe zusammen.
// Muster: describe(name, options, testsuite)
// in den Options kann man die Testsuite konfigurieren, z.B. mit:
// { shuffle: true } führt die Tests in zufälliger Reihenfolge aus –
// so fällt auf, wenn ein Test heimlich vom Ergebnis eines anderen abhängt.
describe('rollDice', { shuffle: true }, () => {
  test('should return as many rolls as dice were thrown', () => {
    // Arrange
    const count = 3;
    // Act
    const result = rollDice(count);
    // Assert: toHaveLength prüft die Länge direkt und gibt bei Fehlern eine klarere Meldung
    // als der Umweg über .length und toBe (auskommentierte Zeile).
    // expect(result.rolls.length).toBe(count);
    expect(result.rolls).toHaveLength(count);
  });

  // Die Würfe sind zufällig, also prüfen wir eine Regel, die immer gelten muss:
  // total ist die Summe aller einzelnen Würfe.
  test('total should be the sum of all rolls', () => {
    const result = rollDice(5);
    const sum = result.rolls.reduce((a, b) => a + b, 0);

    expect(result.total).toBe(sum);
  });
});

// Eine Übersicht über die wichtigsten Matcher – also die Prüf-Methoden nach expect(...)
describe('verschiedene Matchers', () => {
  // Ein Wurf, den sich mehrere Tests teilen
  const result = rollDice(1);

  it('toBe compares primitive values (numbers, strings, booleans)', () => {
    expect(result.rolls.length).toBe(1);
    // .not kehrt jeden Matcher um
    expect(result.total).not.toBe(0);
  });

  it('toEqual compares the CONTENT of objects and arrays', () => {
    // Gleicher Inhalt -> toEqual ist erfüllt
    expect({ rolls: [4], total: 4 }).toEqual({ rolls: [4], total: 4 });
    // toBe vergleicht bei Objekten die Referenz: zwei getrennt erzeugte Objekte sind nie "dasselbe"
    expect({ rolls: [4], total: 4 }).not.toBe({ rolls: [4], total: 4 });
  });

  it('toStrictEqual is stricter: properties that are undefined must match too', () => {
    const withExtra = { rolls: [4], total: 4, bonus: undefined };

    // toEqual ignoriert Properties mit dem Wert undefined ...
    expect(withExtra).toEqual({ rolls: [4], total: 4 });
    // ... toStrictEqual nicht: 'bonus' fehlt im erwarteten Objekt, also kein Treffer
    expect(withExtra).not.toStrictEqual({ rolls: [4], total: 4 });
  });

  it('toMatchObject only checks the properties you list', () => {
    // 'total' wird ignoriert. expect.any(Array) heißt: "irgendein Array", egal mit welchem Inhalt
    expect(rollDice(1, 2)).toMatchObject({ rolls: expect.any(Array) });
  });

  it('toBeTypeOf and toBeInstanceOf check what kind of value we got', () => {
    // toBeTypeOf entspricht dem typeof-Operator
    expect(result.total).toBeTypeOf('number');
    // toBeInstanceOf entspricht dem instanceof-Operator
    expect(result.rolls).toBeInstanceOf(Array);
  });

  it('toBeGreaterThanOrEqual / toBeLessThanOrEqual check ranges', () => {
    // Bei zufälligen Werten prüfen wir den erlaubten Bereich statt eines festen Werts
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeLessThanOrEqual(6);
    // 10 Würfel mit mindestens je 1 Auge ergeben mehr als 9
    expect(rollDice(10).total).toBeGreaterThan(9);
  });

  it('toBeOneOf checks that a value is one of a list of allowed values', () => {
    expect(result.total).toBeOneOf(DICE_FACES);
  });

  it('toContain checks that an array includes an item (or a string a substring)', () => {
    // Bei 1000 Würfen ist praktisch sicher mindestens eine 6 dabei
    const rolls = rollDice(1000).rolls;
    expect(rolls).toContain(6);
  });

  it('toMatch checks a string against a regular expression', () => {
    // Die drei Würfe werden zu einem Text wie "3, 6, 1" zusammengefügt.
    // Die Regex verlangt genau drei Ziffern von 1 bis 6, getrennt durch ", "
    const printed = rollDice(3).rolls.join(', ');
    expect(printed).toMatch(/^[1-6], [1-6], [1-6]$/);
  });

  it('toBeDefined / toBeUndefined / toBeNull check for "missing" values', () => {
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // find() gibt undefined zurück, wenn kein Element passt – es sollte keinen Wurf über 6 geben
    expect(result.rolls.find((roll) => roll > 6)).toBeUndefined();
  });

  it('toBeCloseTo compares decimal numbers that are not exactly equal', () => {
    // Kommazahlen werden binär gespeichert: 0.1 + 0.2 ergibt 0.30000000000000004
    expect(0.1 + 0.2).not.toBe(0.3);
    // toBeCloseTo erlaubt eine winzige Abweichung
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});
