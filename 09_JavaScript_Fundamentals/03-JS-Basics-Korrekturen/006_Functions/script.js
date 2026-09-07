// Functions
// =========

// #### Part 1: Function Declarations

// 1.  **Declare a function with no parameters that outputs something to the console.**
//     *   Declare a function named `greet` that logs "Hello, World!" to the console.

// Funktionsdeklaration
function greet() {
  console.log('Hello, world');
}

//  Arrow Functions
// const greet = () => {
//   console.log('Hello, world');
// };

// Function Expression
// const greet = function () {
//   console.log('Hello, world');
// };

//     *   Call the function.
greet();

// 2.  **Declare a function with one parameter that returns something.**

//     *   Declare a function named `square` that takes a number as a parameter and returns its square.

function square(number) {
  // return number * number;
  return number ** 2;
}
console.log(square(25));

//     *   Call the function with the argument `5`, store the result in a variable, and output it to the console.
const square5 = square(5);
console.log(square5);

// 3.  **Declare a function with one parameter that performs a control flow with a switch statement and returns accordingly.**

//     *   Declare a function named `getDayName` that takes a number (0-6) as a parameter and returns the name of the day.
//     *   Use a switch statement to determine the day name.

//     *   Call the function with the argument `3`, store the result in a variable, and output it to the console.

function getDayName(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'Sonntag';
    case 1:
      return 'Montag';
    case 2:
      return 'Dienstag';
    case 3:
      return 'Mittwoch';
    case 4:
      return 'Donnerstag';
    case 5:
      return 'Freitag';
    case 6:
      return 'Samstag';
    default:
      return 'Kein Wochentag';
  }
}

const dayResult = getDayName(0);
console.log('Tag an Index 3: ', dayResult);

console.log(new Date().getDay());

// #### Part 2: Function Expressions

// 1.  **Repeat the above steps using function expressions assigned to variables.**
//     *   Rewrite the `greet` function as a function expression assigned to a variable named `greetExpression`.

//     *   Rewrite the `square` function as a function expression assigned to a variable named `squareExpression`.

//     *   Rewrite the `getDayName` function as a function expression assigned to a variable named `getDayNameExpression`.

const getDayNameExpression = (dayIndex) => {
  switch (dayIndex) {
    case 0:
      return 'Sonntag';
    case 1:
      return 'Montag';
    case 2:
      return 'Dienstag';
    case 3:
      return 'Mittwoch';
    case 4:
      return 'Donnerstag';
    case 5:
      return 'Freitag';
    case 6:
      return 'Samstag';
    default:
      return 'Kein Wochentag';
  }
};
