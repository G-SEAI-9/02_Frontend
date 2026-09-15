const form = document.querySelector('form');
const userInput = document.getElementById('userInput');
const ul = document.querySelector('ul');

const LOCAL_STORAGE_TASKS = 'tasks';

const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];
const writeToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function createLi(task) {
  const newLi = document.createElement('li');
  const newP = document.createElement('p');
  const deleteBtn = document.createElement('button');

  newLi.classList.add('flex', 'gap-4', 'items-baseline', 'px-4', 'justify-betweem');

  newP.textContent = task.text;

  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'mt-5 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded';

  deleteBtn.addEventListener('click', () => {
    const tasks = getFromStorage(LOCAL_STORAGE_TASKS);
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    writeToStorage(LOCAL_STORAGE_TASKS, updatedTasks);
    newLi.remove();
  });

  newLi.appendChild(newP);
  newLi.appendChild(deleteBtn);

  // ul.appendChild(newLi);
  ul.insertAdjacentElement('afterbegin', newLi);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const inputVal = userInput.value.trim();

  if (!inputVal) {
    alert('Input field cannot be empty');
    return;
  }

  const tasks = getFromStorage(LOCAL_STORAGE_TASKS);

  const newTask = {
    text: inputVal,
    id: crypto.randomUUID(),
  };

  tasks.push(newTask);
  writeToStorage(LOCAL_STORAGE_TASKS, tasks);
  createLi(newTask);

  e.target.reset();
}

function main() {
  const tasks = getFromStorage(LOCAL_STORAGE_TASKS);
  tasks.forEach((t) => {
    createLi(t);
  });
}

form.addEventListener('submit', handleFormSubmit);
window.addEventListener('load', main);

document.getElementById('reload').addEventListener('click', () => {
  window.location.reload();
});
