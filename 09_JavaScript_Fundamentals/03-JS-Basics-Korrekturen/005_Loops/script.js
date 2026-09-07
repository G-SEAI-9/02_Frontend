// Array von Tieren im Zoo
const animals = ['lion', 'tiger', 'bear', 'giraffe', 'zebra', 'monkey'];

// Use a for loop to count the total number of animals.

let count = 0;
for (let _ of animals) {
  count += 1;
}
console.log(count);

// Use a while loop to count animals whose names have five or more letters. You can check the length of a

let longNameAnimals = 0;
let i = 0;
while (i < animals.length) {
  if (animals[i].length >= 5) longNameAnimals++;

  i++;
}
console.log(longNameAnimals);

// Use a do...while loop to count animals until you encounter an animal whose name starts with 'm'

let countBeforeM = 0;

let doIndex = 0;

// do {
//   if (animals[doIndex].toLowerCase().startsWith('m')) {
//     break;
//   }
//   countBeforeM++;
//   doIndex++;
// } while (doIndex < animals.length);

do {
  countBeforeM++;
  doIndex++;
} while (doIndex < animals.length && !animals[doIndex].toLowerCase().startsWith('m'));

console.log("Alle Tiere vor dem 'M'-Tier:", countBeforeM);
