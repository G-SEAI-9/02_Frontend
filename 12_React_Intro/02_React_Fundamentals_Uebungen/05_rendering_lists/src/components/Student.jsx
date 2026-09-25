import Grade from './Grade.jsx';

export default function Student({ studentData }) {
  // console.log(studentData);

  // let status = 'In progress';

  // if (studentData.graduate === true) {
  //   status = 'Graduated';
  // }

  return (
    <article className='card'>
      <img className='card-image' src={studentData.picture} alt='' />
      <div className='card-body'>
        <h2>
          {studentData.firstName} {studentData.lastName}
        </h2>
        <p>Age: {studentData.age}</p>
        <p>City: {studentData.city}</p>
        <p>Course: {studentData.course}</p>

        <Grade gpa={studentData.gpa} />

        <p>Status: {studentData.graduate ? 'Graduated' : 'In progress'}</p>
        {studentData.graduate ? <small>Done</small> : <strong>In Progress</strong>}
      </div>
    </article>
  );
}
