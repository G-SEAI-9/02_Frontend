import type { Todo } from '../types';
import ToDoItem from './ToDoItem';

type ToDoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

const ToDoList = ({ todos, toggleTodo }: ToDoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default ToDoList;
