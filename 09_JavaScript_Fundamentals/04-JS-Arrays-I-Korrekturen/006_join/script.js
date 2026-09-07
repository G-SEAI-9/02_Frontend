// Join
// ====

// #### Objective:

// Learn how to use the `join` method in JavaScript to create a string from the elements of an array.

// #### Instructions:

// 1.  You will be given an array of strings.
// 2.  Use the `join` method to create different strings by joining the array elements with various delimiters.
// 3.  Print the original array and the resulting strings to the console.

const array = ['apple', 'banana', 'cherry', 'date'];

// Create different strings by joining the array elements with various delimiters
// Default delimiter (comma)
console.log(array.join());

// Using dash as delimiter
console.log(array.join('-'));

// Using space as delimiter;
console.log(array.join(' '));

// Using ' and ' as delimiter
console.log(array.join(' and '));

// Without any delimiter
