const ulElement = document.getElementById('todo-list');

function renderTodos(data) {
  const todos = data
    .map((todo) => {
      return `<li class=" rounded-2xl px-4 py-2 flex flex-wrap items-center gap-x-4 gap-y-2
                before:content-[''] before:block before:w-5 before:h-5
                before:rounded-full before:border-2 ${
                  todo.completed ? 'before:bg-green-400 before:border-green-400' : 'before:border-gray-400'
                }" >${todo.title}</li>`;
    })
    .join('');

  return todos;
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('no data fetched'); // 400 - 500
  console.log(response);
  return await response.json();
}

async function main() {
  try {
    const todoData = await fetchData('https://jsonplaceholder.typicode.com/todos');
    // console.log(todoData);
    const todoHTML = renderTodos(todoData);
    console.log(todoHTML);
    ulElement.insertAdjacentHTML('beforeend', todoHTML);
  } catch {
    ulElement.insertAdjacentHTML('beforeend', '<p>Error: Try again later</p>');
  }
}

main();

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then((data) => {
//     data.slice(0, 10).forEach((todo) => {
//       const li = document.createElement("li");
//       li.textContent = todo.title;

//       // check completed
//       if (todo.completed) {
//         li.style.textDecoration = "line-through";
//       }

//       ulElement.appendChild(li);
//     });
//   });
