// Arithmetic
// ==========

// **Objective:**

// Write a JavaScript program that performs a series of arithmetic operations using mixed data types and prints the results to the console. You will explore how JavaScript handles operations involving both strings and numbers.

// ### Tasks:

// 1.  **Addition with Mixed Types**

//     *   Create a variable that stores a number.
let number = 69;
//     *   Create a variable that stores a string representation of a number.
let strNumber = '5';
//     *   Add these two variables and print the result.

console.log('69 + 5 = ', number + strNumber);

//     *   Explain the output.

// 2.  **Subtraction with Mixed Types**
//     *   Using the same string and number variables, subtract the string from the number and print the result.
// *   Explain why the output differs from the addition.
console.log('69 - 5 = ', number - strNumber);
console.log('Hallo' - ' ' - 'Welt');
console.log('69 - "Welt" = ', number - 'Welt');

// 3.  **Multiplication with a String**
//     *   Multiply the string variable by a new number and print the result.
console.log('string * 5 = ', 'string' * 5);

// 4.  **Division by a String**
//     *   Divide a number by the string variable and print the result.
console.log('string / 5 = ', 'string' / 5);
console.log('"10" / 5 = ', '10' / 5);

// 5.  **Modulus Operation**
//     *   Use modulus on two number variables and print the result.
console.log('11 % 3 = ', 11 % 3);
console.log('11 % -3 = ', 11 % -3);
console.log('-11 % 3 = ', 11 % 3);

//     *   Change one of the numbers to a string and perform the modulus operation again. Print the result.

// console.log(eval('6 + 4'));

// 6.  **Perform a Series of Numeric Operations**

//     *   Define several new numeric variables.
//     *   Perform and print the result of each operation: addition, subtraction, multiplication, division, and modulus.
//     *   For each operation, include at least one example that uses more than two numbers.
// ### Notes:

// *   Consider what happens when operations are performed on different data types.
// *   JavaScript performs type coercion in certain operations. Reflect on how this affects the results.
