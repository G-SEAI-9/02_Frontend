export type DiceRoll = {
  rolls: number[];
  total: number;
};
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

console.log(rollDice(4));
