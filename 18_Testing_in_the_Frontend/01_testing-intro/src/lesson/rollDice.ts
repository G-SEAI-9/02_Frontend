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
    const roll = Math.floor(Math.random() * sides);
    rolls.push(roll);
    total += roll;
  }

  return { rolls, total };
}
