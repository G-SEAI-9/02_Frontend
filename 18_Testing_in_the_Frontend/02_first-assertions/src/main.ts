import './style.css';
import {
  validatePizzaOrder,
  generateSuperheroName,
  findCutestAnimal,
  countEmojisInMessage,
  fetchRandomCatFact,
  calculateGroupBill,
  formatPlaylistName,
  generateSecurePassword,
  sortMovies,
  type Animal,
  type Movie
} from './utils';

// Create app container
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="font-sans leading-relaxed max-w-5xl mx-auto p-5 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-3">🧪 Testing Exercise - Utility Functions</h1>
    <p class="text-center text-slate-600 dark:text-slate-300 mb-3">Welcome to the testing exercise! Below are 10 utility functions in action.</p>
    <p class="text-center text-slate-600 dark:text-slate-300 mb-8"><strong>Your task:</strong> Create comprehensive test suites for each function using Vitest!</p>
    <div id="results"></div>
  </div>
`;

const resultsContainer = document.querySelector('#results')!;

// Function to add result to the page
function addResult(title: string, result: string) {
  const resultDiv = document.createElement('div');
  resultDiv.className =
    'bg-white dark:bg-gray-800 my-5 p-5 rounded-lg shadow-md dark:shadow-gray-900/50';
  resultDiv.innerHTML = `
    <h3 class="mt-0 text-slate-800 dark:text-slate-100 border-b-2 border-blue-500 dark:border-blue-400 pb-3 mb-4 font-semibold text-lg">${title}</h3>
    <pre class="bg-gray-50 dark:bg-gray-700 p-4 rounded border-l-4 border-blue-500 dark:border-blue-400 overflow-x-auto whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">${result}</pre>
  `;
  resultsContainer.appendChild(resultDiv);
}

// 1. Pizza Order Validator
const pizzaResult1 = validatePizzaOrder('large', ['pepperoni', 'mushrooms'], 25);
const pizzaResult2 = validatePizzaOrder('small', ['pineapple', 'ham'], 30);
const pizzaResult3 = validatePizzaOrder('medium', ['cheese'], 3);
addResult(
  '🍕 Testing Pizza Order Validator...',
  `Valid large pizza: ${JSON.stringify(pizzaResult1, null, 2)}
Invalid combination: ${JSON.stringify(pizzaResult2, null, 2)}
Invalid size & age: ${JSON.stringify(pizzaResult3, null, 2)}`
);

// 2. Superhero Name Generator
const hero1 = generateSuperheroName(false);
const hero2 = generateSuperheroName(true);
const hero3 = generateSuperheroName();
addResult(
  '🦸 Testing Superhero Name Generator...',
  `Without title: "${hero1}"
With title: "${hero2}"
Default: "${hero3}"`
);

// 3. Cutest Animal Finder
const animals: Animal[] = [
  { name: 'Fluffy', cuteness: 8.5, species: 'cat' },
  { name: 'Buddy', cuteness: 9.2, species: 'dog' },
  { name: 'Squeaky', cuteness: 7.8, species: 'hamster' },
  { name: 'Nibbles', cuteness: 9.2, species: 'rabbit' }
];
const cutestAnimal = findCutestAnimal(animals);
const noCutest = findCutestAnimal([]);
addResult(
  '🐱 Testing Cutest Animal Finder...',
  `Cutest animal: ${JSON.stringify(cutestAnimal, null, 2)}
Empty array result: ${noCutest}`
);

// 4. Emoji Counter
const message1 = 'I love pizza 🍕 and ice cream 🍦!';
const message2 = 'Party time! 🎉🎊🥳🎈';
const message3 = 'No emojis here :)';
addResult(
  '😊 Testing Emoji Counter...',
  `"${message1}" has ${countEmojisInMessage(message1)} emojis
"${message2}" has ${countEmojisInMessage(message2)} emojis
"${message3}" has ${countEmojisInMessage(message3)} emojis`
);

// 5. Cat Fact Fetcher - Will show at the end because async :D
async function testCatFacts() {
  try {
    const fact1 = await fetchRandomCatFact(true);
    const fact2 = await fetchRandomCatFact(false);
    addResult(
      '🐾 Testing Cat Fact Fetcher...',
      `With breeds: "${fact1}"
General only: "${fact2}"`
    );
  } catch (error) {
    addResult('🐾 Testing Cat Fact Fetcher...', `Error: ${error}`);
  }
}
testCatFacts();

// 6. Group Bill Calculator
const billResult1 = calculateGroupBill([25.99, 18.5, 32.75], 18, 3);
const billResult2 = calculateGroupBill([45.0], 20, 1);
addResult(
  '💰 Testing Group Bill Calculator...',
  `3-person bill: ${JSON.stringify(billResult1, null, 2)}
Solo diner: ${JSON.stringify(billResult2, null, 2)}`
);

// 7. Playlist Name Formatter
const playlist1 = formatPlaylistName('my@awesome#playlist!', 'title');
const playlist2 = formatPlaylistName('  ROCK    CLASSICS  ', 'sentence');
const playlist3 = formatPlaylistName('hip-hop vibes', 'upper');
const playlist4 = formatPlaylistName('', 'title');
addResult(
  '🎵 Testing Playlist Name Formatter...',
  `Title case: "${playlist1}"
Sentence case: "${playlist2}"
Upper case: "${playlist3}"
Empty input: "${playlist4}"`
);

// 8. Password Generator
const password1 = generateSecurePassword(12);
const password2 = generateSecurePassword(8, { includeUppercase: false, includeSymbols: true });
const password3 = generateSecurePassword(16, { includeNumbers: false, includeSymbols: false });
addResult(
  '🔒 Testing Password Generator...',
  `Default 12-char: "${password1}"
8-char with symbols: "${password2}"
16-char letters only: "${password3}"`
);

// 9. Movie Sorter
const movies: Movie[] = [
  { title: 'The Matrix', year: 1999, rating: 8.7, duration: 136, genre: 'Sci-Fi' },
  { title: 'Inception', year: 2010, rating: 8.8, duration: 148, genre: 'Sci-Fi' },
  { title: 'The Godfather', year: 1972, rating: 9.2, duration: 175, genre: 'Crime' },
  { title: 'Pulp Fiction', year: 1994, rating: 8.9, duration: 154, genre: 'Crime' }
];

const sortedByRating = sortMovies(movies, 'rating', 'desc');
const sortedByYear = sortMovies(movies, 'year', 'asc');
addResult(
  '🎬 Testing Movie Sorter...',
  `By rating (desc): ${sortedByRating.map(m => `${m.title} (${m.rating})`).join(', ')}
By year (asc): ${sortedByYear.map(m => `${m.title} (${m.year})`).join(', ')}`
);
