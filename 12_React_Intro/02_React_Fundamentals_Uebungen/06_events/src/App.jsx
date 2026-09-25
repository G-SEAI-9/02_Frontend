function App() {
  function handleSubmit(e) {
    e.preventDefault();

    // console.log(e.target.elements['name'].value);
    const { name, age, color, recommend } = e.target.elements;

    if (!name.value) alert('Name ist leer');
    if (!age.value) alert('Age ist leer');
    if (!color.value) alert('Keine Farbe ausgewählt');

    console.log({
      name: name.value,
      age: age.value,
      color: color.value,
      recommend: recommend.value,
    });
  }

  return (
    <>
      <h1
        onDoubleClick={() => {
          console.log('Double Click');
        }}
      >
        Events
      </h1>

      <div className='app'>
        <form onSubmit={handleSubmit}>
          <label htmlFor=''>
            Name <input type='text' name='name' id='name' />
          </label>
          <label htmlFor=''>
            Age <input type='text' name='age' inputMode='numeric' pattern='[0-9]*' />
          </label>
          <label htmlFor=''>
            Favorite Color
            <select name='color' defaultValue=''>
              <option value='' disabled>
                --Select--
              </option>
              <option value='red'>Red</option>
              <option value='green'>Green</option>
              <option value='blue'>Blue</option>
            </select>
          </label>
          <fieldset>
            <legend>Would you recommend our site?</legend>
            <input type='checkbox' name='recommend' id='recommend' />{' '}
            <label htmlFor='recommend' className='checkbox'>
              I would recommend this site
            </label>
          </fieldset>
          <button name='button' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
