import { useTodos } from '../context/TodoContext.jsx';
import { useTodoReducer } from '../context/TodoReducerContex.jsx';

const ToDoItem = ({ todo }) => {
  // const { toggleTodo } = useTodos();
  const { toggleTodo } = useTodoReducer();

  return (
    <li className='flex items-center mb-2'>
      <label>
        <input type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)} className='mr-2' />
        {todo.text}
      </label>
    </li>
  );
};

export default ToDoItem;
