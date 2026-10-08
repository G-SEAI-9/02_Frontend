import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const TodoContext = createContext([]);

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState(() =>
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
  );
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const toggleTodo = (id) => {
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

  const value = {
    setTodos,
    setFilter,
    todos: filteredTodos,
    toggleTodo,
  };

  return <TodoContext value={value}> {children}</TodoContext>;
}

export function useTodos() {
  return useContext(TodoContext);
}
