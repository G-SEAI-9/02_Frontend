import { useTodos } from '../context/TodoContext.jsx';
import { useTodoReducer } from '../context/TodoReducerContex.jsx';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  // const { todos } = useTodos();
  const { todos } = useTodoReducer();

  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default ToDoList;
