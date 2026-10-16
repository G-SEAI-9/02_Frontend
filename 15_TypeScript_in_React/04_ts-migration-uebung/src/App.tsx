import { useEffect, useState } from 'react';
import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

import type { Filter, Todo } from './types';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const todos: Todo[] = JSON.parse(saved);
      return todos;
    }
    return [];
  });

  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed' && todo.completed) return true;
    if (filter === 'active' && !todo.completed) return true;
    return false;
  });

  return (
    <div className='grid place-content-center min-h-screen mx-auto w-3xl p-4'>
      <AddToDo setTodos={setTodos} />
      <FilterComponent setFilter={setFilter} />
      <ToDoList todos={filteredTodos} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;
