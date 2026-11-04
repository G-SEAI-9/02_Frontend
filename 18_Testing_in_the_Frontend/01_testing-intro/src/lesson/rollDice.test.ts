import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { rollDice, rollDiceAsync } from './rollDice';

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

  it.skip('toBe compares primitive values (numbers, strings, booleans)', () => {
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

  it.skip('toBeOneOf checks that a value is one of a list of allowed values', () => {
    expect(result.total).toBeOneOf(DICE_FACES);
  });

  // it('toContain checks that an array includes an item (or a string a substring)', () => {
  //   // Bei 1000 Würfen ist praktisch sicher mindestens eine 6 dabei
  //   const rolls = rollDice(1000).rolls;
  //   expect(rolls).toContain(6);
  // });

  it.skip('toMatch checks a string against a regular expression', () => {
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

describe('Controlling randomness', () => {
  // beforeAll(() => {
  //   console.log('Läuft vor dieser Test Suite');
  // });

  // beforeEach(() => {
  //   console.log('läuft vor jedem einzelnen Test');
  // });

  // Nach jedem Test alle Spies/Mocks zurücksetzen: Math.random ist wieder echt.
  // Sonst würde ein Mock aus Test A heimlich Test B beeinflussen.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should be able to roll highest number', () => {
    // vi.spyOn "belauscht" eine bestehende Methode (hier Math.random).
    // Mit .mockReturnValue() ersetzen wir zusätzlich ihr Ergebnis:
    // Math.random liefert jetzt immer 0.99999 statt eines Zufallswerts.
    // So wird der zufällige Wurf vorhersagbar und wir können den Grenzfall "höchste Zahl" testen.
    vi.spyOn(Math, 'random').mockReturnValue(0.99999);

    const highestValue = 250;

    const result = rollDice(1, highestValue);
    expect(result.rolls[0]).toBe(highestValue);
  });

  test('should be able to roll lowest number', () => {
    // Der andere Randfall: 0 ist der kleinste Wert, den Math.random liefern kann -> Wurf ist 1
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = rollDice(1, 234);
    expect(result.rolls[0]).toBe(1);
  });

  test('random has been called', () => {
    // Spy ohne mockReturnValue: Math.random arbeitet ganz normal weiter,
    // aber der Spy zählt mit, wie oft und mit welchen Argumenten es aufgerufen wurde.
    const spy = vi.spyOn(Math, 'random');

    rollDice(4);

    // 4 Würfel -> Math.random muss genau 4-mal aufgerufen worden sein
    expect(spy).toHaveBeenCalledTimes(4);
  });
});

// rollDiceAsync wartet intern 1 Sekunde (setTimeout). Mit echten Timern würden
// diese 6 Tests zusammen 6 Sekunden dauern – mit Fake-Timern nur Millisekunden.
describe('Timers', () => {
  // Vor jedem Test: Vitest ersetzt setTimeout & Co. durch eine künstliche Uhr,
  // die nur weiterläuft, wenn wir sie im Test selbst vorspulen.
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // Nach jedem Test wieder die echte Uhr verwenden, damit andere Tests nicht betroffen sind
  afterEach(() => {
    vi.useRealTimers();
  });

  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    // Wichtig: noch nicht awaiten! Die Promise hängt im setTimeout fest,
    // und die Fake-Uhr steht still – ein await hier würde ewig warten.
    const dicePromise = rollDiceAsync(4);
    // Spult die Fake-Uhr vor, bis alle wartenden Timer abgelaufen sind (die 1 Sekunde vergeht sofort)
    await vi.runAllTimersAsync();
    // Jetzt ist der Timer durch und die Promise kann sich auflösen
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });

  // Viele Test mit ähnlichen Timern würden die Laufzeit der Test-Suite
  // unnötig in die Länge ziehen.
  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    const dicePromise = rollDiceAsync(4);
    await vi.runAllTimersAsync();
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });
  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    const dicePromise = rollDiceAsync(4);
    await vi.runAllTimersAsync();
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });
  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    const dicePromise = rollDiceAsync(4);
    await vi.runAllTimersAsync();
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });
  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    const dicePromise = rollDiceAsync(4);
    await vi.runAllTimersAsync();
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });
  test('random has been called', async () => {
    const spy = vi.spyOn(Math, 'random');
    const dicePromise = rollDiceAsync(4);
    await vi.runAllTimersAsync();
    await dicePromise;
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
