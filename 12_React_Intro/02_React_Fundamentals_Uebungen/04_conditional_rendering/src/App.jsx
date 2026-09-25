import Student from './components/Student.jsx';

const studentData = {
  id: 1,
  firstName: 'Edward',
  lastName: 'McTest',
  age: 42,
  course: 'Web Development',
  city: 'Berlin',
  picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  graduate: false,
  gpa: 87,
};
const studentData2 = {
  id: 2,
  firstName: 'Johan',
  lastName: 'McTest',
  age: 42,
  course: 'Softwareentwicklung',
  city: 'Berlin',
  picture: 'https://randomuser.me/api/portraits/men/2.jpg',
  graduate: true,
  gpa: 50,
};

function App() {
  return (
    <>
      <h1>Conditional Rendering</h1>

      <Student studentData={studentData} />
      <Student studentData={studentData2} />
    </>
  );
}

export default App;
