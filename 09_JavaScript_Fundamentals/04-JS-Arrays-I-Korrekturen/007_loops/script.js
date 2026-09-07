// Loops (for and for...of)
// ========================

// **Objective:**

// Learn how to use `for` and `for...of` loops to iterate over arrays of numbers and arrays of objects in JavaScript.

// **Instructions:**

// 1.  **Initialize an Array of Numbers:**

//     *   Create an array called `numberArray` containing
// the following values in order: `10`, `20`, `30`, `40`, `50`.
let numberArray = [10, 20, 30, 40, 50];

// 2.  **Iterate Over the Array with a `for` Loop:**

//     *   Use a `for` loop to iterate over `numberArray`
// and print each value to the console.

// for (let i = 0; i < numberArray.length; i++) {
//   console.log(numberArray[i]);
// }

// for (let i = numberArray.length - 1; i >= 0; i--) {
//   console.log(numberArray[i]);
// }

for (let i = 0; i < numberArray.length; i = i + 2) {
  console.log(numberArray[i]);
}

// 3.  **Iterate Over the Array with a `for...of` Loop:**

//     *   Use a `for...of` loop to iterate over `numberArray`
// and print each value to the console.

for (const element of numberArray) {
  console.log(element);
}

// Nicht bei Arrays -> für Objekte
// for (const element in numberArray) {
//   console.log(element);
// }
