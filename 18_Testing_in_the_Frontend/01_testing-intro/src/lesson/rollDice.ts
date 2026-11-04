// Das Ergebnis eines Wurfs: alle einzelnen Augenzahlen und ihre Summe
export type DiceRoll = {
  rolls: number[];
  total: number;
};

// Würfelt 'count' Würfel mit je 'sides' Seiten (Standard: 6).
// Anders als sum() ist das Ergebnis zufällig – deshalb können die Tests keinen
// festen Wert erwarten, sondern nur Eigenschaften prüfen (Anzahl, Summe, Wertebereich).
export function rollDice(count: number, sides: number = 6): DiceRoll {
  const rolls: number[] = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  return { rolls, total };
}

// Wie rollDice, aber das Ergebnis kommt erst nach 1 Sekunde (z.B. für eine Würfel-Animation).
// Dient als Beispiel für Tests mit Fake-Timern.
export async function rollDiceAsync(count: number, sides: number = 6): Promise<DiceRoll> {
  const result = rollDice(count, sides);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return result;
}
