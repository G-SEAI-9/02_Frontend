import { sum } from './sum.ts';

// Schritt 1: Arrange
const input = {
  a: 5,
  b: 7,
};

const expectedOutput = 12;

// Schritt 2: Act
const actualOutput = sum(input.a, input.b);

// Schritt 3: Assert

if (actualOutput !== expectedOutput) {
  throw new Error(`sum() failed the test!\nExpected: ${expectedOutput}\nActual: ${actualOutput}`);
} else {
  console.log('Test bestanden!');
}

// Arrange
const casesTable = [
  { input: { a: 5, b: 7 }, out: 12 },
  { input: { a: 1, b: 1 }, out: 2 },
  { input: { a: -5, b: 7 }, out: 2 },
  { input: { a: 5000, b: 7 }, out: 5007 },
  { input: { a: 123, b: 7 }, out: 130 },
];

for (const testCase of casesTable) {
  // Act
  const actual = sum(testCase.input.a, testCase.input.b);

  // Assert
  if (actual !== testCase.out) {
    throw new Error(`sum() failed the test!\nExpected: ${testCase.out}\nActual: ${actual}`);
  } else {
    console.log('Test bestanden!');
  }
}
