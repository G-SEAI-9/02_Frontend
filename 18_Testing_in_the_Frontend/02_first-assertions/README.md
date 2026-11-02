# TS Playground - Testing Exercise

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone git@github.com:WebDev-WBSCodingSchool/first-assertions.git
   cd first-assertions
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Exercise Instructions

This exercise is all about **writing tests**, not modifying the existing functions. Your task is to work exclusively with the `.test.ts` files in the `src/utils/` directory.

### Rules:

- ❌ **DO NOT modify any functions** in the main utility files (e.g., `catFactFetcher.ts`, `emojiCounter.ts`, etc.)
- ✅ **ONLY work on the `.test.ts` files**
- ✅ **Discovering edge cases that make the current implementation fail is encouraged!** That's what testing is all about!

### Your Mission:

Write comprehensive test cases for each utility function to:

- Test normal/expected behavior
- Test edge cases and boundary conditions
- Discover potential bugs or weaknesses in the implementations
- Practice writing clear, descriptive test descriptions

### Available Test Files:

- `catFactFetcher.test.ts` - Test API calls and async behavior
- `cutestAnimalFinder.test.ts` - Test animal ranking logic
- `emojiCounter.test.ts` - Test emoji counting functionality
- `groupBillCalculator.test.ts` - Test bill splitting calculations
- `movieSorter.test.ts` - Test movie sorting algorithms
- `passwordGenerator.test.ts` - Test password generation rules
- `pizzaOrderValidator.test.ts` - Test order validation logic
- `playlistNameFormatter.test.ts` - Test string formatting
- `superheroNameGenerator.test.ts` - Test name generation

### Running Tests:

```bash
npm test
```

### VS Code Testing Integration:

For a better testing experience in VS Code, consider installing the **Vitest Explorer** extension:

- Extension: [Vitest Explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
- This will add a Testing view to your Activity Bar, allowing you to run and debug tests directly from the VS Code interface
- You can run individual tests, see test results inline, and get better debugging capabilities

### Tips:

- Think about what could go wrong with each function
- Test with empty inputs, null values, extreme numbers, special characters
- Write descriptive test names that explain what you're testing
- If you find a bug, that's a success! Document it in your test

Remember: The goal is to become a better tester by thinking critically about code and finding its limitations through well-designed test cases.
