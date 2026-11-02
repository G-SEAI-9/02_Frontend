// Eine "pure function": gleiche Eingabe -> immer gleiche Ausgabe, keine Nebenwirkungen.
// Solche Funktionen sind das ideale erste Ziel für Unit Tests.
export function sum(a: number, b: number) {
  return a + b;
}
