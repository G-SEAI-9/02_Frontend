const btn = document.querySelector('button');
const currCountEl = document.getElementById('curr-count');
let currentCount = 0;

btn.addEventListener('click', () => {
  currentCount++;
  currCountEl.textContent = currentCount;
});
