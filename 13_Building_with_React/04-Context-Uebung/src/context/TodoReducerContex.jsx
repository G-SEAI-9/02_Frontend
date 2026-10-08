import { createContext, useContext, useEffect, useReducer } from 'react';

const TodoReducerContext = createContext();

const initialState = {
  todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
  filter: 'all', // "all", "completed", "active"
};

function reduce(state, action) {
  switch (action.type) {
    case 'add_todo': {
      const newTodos = [{ id: Date.now(), text: action.payload, completed: false }, ...state.todos];
      return { ...state, todos: newTodos };
    }
    case 'filter_todo': {
      return { ...state, filter: action.payload };
    }
    case 'toggle_todo': {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return { ...state, todos };
    }
    default:
      throw new Error(`Unkown action: ${action.type}`);
  }
}

export default function TodoReducerProvider({ children }) {
  const [state, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  function addTodo(text) {
    dispatch({ type: 'add_todo', payload: text });
  }

  function setFilter(filter) {
    dispatch({ type: 'filter_todo', payload: filter });
  }

  function toggleTodo(id) {
    dispatch({ type: 'toggle_todo', payload: id });
  }

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'all') return true;
    if (state.filter === 'completed' && todo.completed) return true;
    if (state.filter === 'active' && !todo.completed) return true;
    return false;
  });

  return (
    <TodoReducerContext value={{ todos: filteredTodos, addTodo, setFilter, toggleTodo }}>{children}</TodoReducerContext>
  );
}

export function useTodoReducer() {
  return useContext(TodoReducerContext);
}
