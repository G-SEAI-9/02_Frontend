import { useState } from 'react';
import type { Todo } from '../types';

type AddToDoProps = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const AddToDo = ({ setTodos }: AddToDoProps) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return alert('Please enter a to-do item');
    setTodos((prevTodos) => {
      const toDos = [{ id: Date.now(), text: newTodo, completed: false }, ...prevTodos];
      // localStorage.setItem('todos', JSON.stringify(toDos));
      return toDos;
    });
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex'>
      <input
        type='text'
        name='todo'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Add a new to-do'
        className='flex-1 border rounded px-2 py-1 mr-2'
      />
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
        Add
      </button>
    </form>
  );
};

export default AddToDo;
