// **Objective**

// In this exercise, you will create a simple contact form and use JavaScript to handle the form submission, validate the fields, and display the submitted data.

// **Instructions:**

// * Add an event listener to handle form submission.
//     - Validate that all fields are not empty.
//     - If validation passes, output the form data to the console and display it in the `p` element as a list (`ul`)
//     - If not output an error message in the `p` element, style it as an error. Maybe something red and flashy?
//     - [Make sure to toggle the error and success styles](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)!
//     - Clear the form fields

const formEl = document.getElementById('contact-form');
const nameErrorEl = document.getElementById('name-error');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  nameErrorEl.innerHTML = '';

  const formElements = event.target.elements;
  const nameEl = formElements['name'];
  const emailEl = formElements['email'];
  const messageEl = formElements['message'];

  if (!nameEl.value) {
    const errorHTML = `<p class="error">Name is required</p>`;
    nameErrorEl.insertAdjacentHTML('beforeend', errorHTML);
  }
  if (!emailEl.value) console.log('Email ist leer');
  if (!messageEl.value) console.log('Message ist leer');

  // wenn keine Fehler -> übermittle Nachricht -> fetch()
});
