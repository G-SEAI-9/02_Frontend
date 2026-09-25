export default function Student({ studentData }) {
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
      </div>
    </article>
  );
}
