import { createContext, useContext, useEffect, useState } from 'react';
import type { Filter, Todo } from '../types';

type ToDoContextType = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  todos: Todo[];
  toggleTodo: (id: number) => void;
  somethingDifferent: number;
};

const TodoContext = createContext<ToDoContextType | null>(null);

export default function TodoContextProvider({ children }: { children: React.ReactNode }) {
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

  const somethingDifferent = 42;

  const value = {
    setTodos,
    setFilter,
    todos: filteredTodos,
    toggleTodo,
    somethingDifferent,
  };

  return <TodoContext value={value}> {children}</TodoContext>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('Your holding the context wrong');
  return ctx;
}
