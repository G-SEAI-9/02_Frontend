import { getFromStorage, LOCAL_STORAGE_TASKS, writeToStorage } from '../utils/index.js';

const ul = document.querySelector('ul');

export default function createLi(task) {
  const newLi = document.createElement('li');
  const newP = document.createElement('p');
  const deleteBtn = document.createElement('button');

  newLi.classList.add('flex', 'gap-4', 'items-baseline', 'px-4', 'justify-between');

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
