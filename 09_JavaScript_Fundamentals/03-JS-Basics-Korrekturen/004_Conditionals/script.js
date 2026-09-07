// Conditionals
// ============

// **Objective:**

// Write JavaScript code that provides clothing advice based on the current temperature. This exercise will help you learn how to use different types of conditional statements effectively.

// #### Tasks:

// 1.  Define a variable `temperature` and set it to any integer to represent the temperature in degrees Celsius.
const temperature = 7;

// 2.  Use `if/else` to advise wearing a coat if the temperature is below 15 degrees.

if (temperature < 15) {
  console.log('Wear a coat');
} else {
  console.log("You don't need a coat");
}

// 3.  Use `if/else if/else` to give advice based on three temperature ranges:
//     *   Below 15 degrees: suggest a coat.
//     *   Between 15 and 25 degrees: suggest a sweater.
//     *   Above 25 degrees: suggest a t-shirt.

if (temperature < 15) {
  console.log('Wear a coat');
} else if (temperature <= 25) {
  console.log('Wear a sweater');
} else {
  console.log("You don't need a coat");
}

// 4.  Use a `switch` statement to provide advice based on specific temperatures (just a few for example): 10, 20, and 30 degrees.

switch (temperature) {
  case 10:
    console.log('Genau 10°C: Dicker Mantel ist gut');
    break;
  case 20:
    console.log('Genau 20°C: Pullover reicht');
    break;
  case 30:
    console.log('Genau 30°C: nimm ein Eisbad');
    break;
}

switch (temperature) {
  case 7:
  case 6:
  case 8:
  case 9:
  case 10:
    console.log('Dicker Mantel ist gut');
    break;
  case 20:
    console.log('Genau 20°C: Pullover reicht');
    break;
  case 30:
    console.log('Genau 30°C: nimm ein Eisbad');
    break;
}

switch (true) {
  case temperature <= 10:
    console.log('Dicker Mantel ist gut');
    break;
  case temperature <= 20:
    console.log('Genau 20°C: Pullover reicht');
    break;
  case temperature <= 30:
    console.log('Genau 30°C: nimm ein Eisbad');
    break;
}

// 5.  Print the results for each task to the console.
