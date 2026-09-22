import createLi from '../ui/listElements.js';
import { getFromStorage, LOCAL_STORAGE_TASKS, writeToStorage } from '../utils/index.js';

export default function handleFormSubmit(e) {
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
