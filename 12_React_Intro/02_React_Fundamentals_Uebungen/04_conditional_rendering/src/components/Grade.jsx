const calcGrade = (gpa) => {
  if (gpa >= 97) {
    return 'A+';
  } else if (gpa >= 93) {
    return 'A';
  } else if (gpa >= 90) {
    return 'A-';
  } else if (gpa >= 87) {
    return 'B+';
  } else if (gpa >= 83) {
    return 'B';
  } else if (gpa >= 80) {
    return 'B-';
  } else if (gpa >= 77) {
    return 'C+';
  } else if (gpa >= 73) {
    return 'C';
  } else if (gpa >= 70) {
    return 'C-';
  } else if (gpa >= 67) {
    return 'D+';
  } else if (gpa >= 63) {
    return 'D';
  } else if (gpa >= 60) {
    return 'D-';
  } else {
    return 'F';
  }
};

export default function Grade({ gpa }) {
  const grade = calcGrade(gpa);
  return (
    <p>
      Grade:{' '}
      <span
        // style={{
        //   color: grade === 'F' ? 'red' : 'currentColor',
        // }}

        className={grade === 'F' ? 'failed-grade' : ''}
      >
        {grade}
      </span>
    </p>
  );
}
