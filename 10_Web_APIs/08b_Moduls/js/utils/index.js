const LOCAL_STORAGE_TASKS = 'tasks';

const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];
const writeToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export { LOCAL_STORAGE_TASKS, getFromStorage, writeToStorage };
