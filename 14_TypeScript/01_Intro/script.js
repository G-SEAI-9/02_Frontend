"use strict";
const countEl = document.getElementById('count');
const numberEl = document.getElementById('number');
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    countEl.textContent += numberEl.value;
    e.target.reset();
});
// "5" == 5
// "5" === 5
const person = {
    name: 'Guybrush',
};
//
//
//
console.log(person.nmea);
person.name = 42;
person.gibtsnicht = document;
window = 31;
