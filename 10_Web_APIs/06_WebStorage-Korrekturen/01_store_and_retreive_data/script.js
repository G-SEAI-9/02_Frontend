//
const formEl = document.querySelector('form');
const ulEl = document.querySelector('ul');
const reloadEl = document.getElementById('reload');

const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];

const createLi = (text) => {
  const newLi = document.createElement('li');
  newLi.textContent = text;
  ulEl.appendChild(newLi);
};

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = e.target.elements.userInput.value.trim();

  if (!userInput) {
    alert('Cannot submit an empty input');
    return;
  }

  const fromLocalStorage = getFromStorage('tasks');

  const toLocalStorage = JSON.stringify([...fromLocalStorage, userInput]);
  localStorage.setItem('tasks', toLocalStorage);
  createLi(userInput);

  e.target.reset();
});

const renderStorage = () => {
  const fromLocalStorage = getFromStorage('tasks');
  fromLocalStorage.forEach((element) => {
    createLi(element);
  });
};

reloadEl.addEventListener('click', () => {
  window.location.reload();
});

// renderStorage();
window.addEventListener('load', renderStorage);
