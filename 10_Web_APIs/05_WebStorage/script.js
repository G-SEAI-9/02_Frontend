console.log(localStorage);

const number = 42;

localStorage.setItem('favouriteNumber', number);

const data = localStorage.getItem('favouriteNumber');

console.log(data);
console.log(typeof data, data);
console.log(typeof number, number);

const myObjekt = {
  username: 'm_hausler',
  long_necessary_text: 'sfhower sihfosefuz9weir siufhisu sdfhisfbew skfs',
  selections: ['A1', 'D4'],

  myMethod() {
    return 'Hallo';
  },
};

console.log(myObjekt);

//  Serialisierung
const stringifiedForm = JSON.stringify(myObjekt);

localStorage.setItem('long form', stringifiedForm);
const formularFromLocalStorage = localStorage.getItem('long form');
console.log(formularFromLocalStorage);

//  Deserialisierung
const objectToPopulateForm = JSON.parse(formularFromLocalStorage);
