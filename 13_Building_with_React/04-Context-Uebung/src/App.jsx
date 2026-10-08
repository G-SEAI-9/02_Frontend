import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

const App = () => {
  return (
    <div className='grid place-content-center min-h-screen mx-auto max-w-3xl p-4'>
      <AddToDo />
      <FilterComponent />
      <ToDoList />
    </div>
  );
};

export default App;
