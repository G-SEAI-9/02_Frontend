import './style.css';
import handleFormSubmit from './handlers/submitHandler.js';
import createLi from './ui/listElements.js';
import { getFromStorage, LOCAL_STORAGE_TASKS } from './utils/index.js';

const form = document.querySelector('form');

function main() {
  form.addEventListener('submit', handleFormSubmit);
  document.getElementById('reload').addEventListener('click', () => {
    window.location.reload();
  });
  const tasks = getFromStorage(LOCAL_STORAGE_TASKS);
  tasks.forEach((t) => {
    createLi(t);
  });
}

window.addEventListener('load', main);
