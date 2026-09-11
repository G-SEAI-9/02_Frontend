// ============================================================
// 1.  **Select Elements and Log to Console**:
// ============================================================

//     *   Select the `h1` element inside the `.hero-content`
//     *   div and log it to the console.
const headingEl = document.querySelector('.hero-content > h1');
// console.log(headingEl);

//     *   Select all the `a` elements inside the `.nav-list`
//     *   and log them to the console.
const navLinks = document.querySelectorAll('.nav-list a');
console.log(navLinks);

//     *   Select the `.btn` element and log it to the console.
const buttonEl = document.querySelector('.btn');
console.log(buttonEl);

// ============================================================
// 2.  **Modify Styles**:
// ============================================================

//     *   Change the background-color of the `.header`
//     *   element to `#b5651d`.
const headerEl = document.querySelector('header');
console.log(headerEl);
headerEl.style.backgroundColor = '#b5651d';

//     *   Change the font size of the `h1` element inside the
//     *   `.hero-content` div to `3rem`.
headingEl.style.fontSize = '3rem';

//     *   Change the text color of all `a` elements inside the
//     *   `.nav-list` to `#faf0e6`.

navLinks.forEach((link) => {
  link.style.color = '#faf0e6';
});

// ============================================================
// 3.  **Add Content**:
// ============================================================

//     *   Select the `.hero-content` div and add a new `p`
//     *   element with the text "Open daily from 7 AM to 9 PM."
//     *   inside it.

const heroContent = document.querySelector('.hero-content');

const openHoursPara = document.createElement('p');

openHoursPara.textContent = 'Open daily from 7 AM to 9 PM.';

heroContent.appendChild(openHoursPara);
