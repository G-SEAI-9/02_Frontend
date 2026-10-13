// === Generics Practice ===
// You will be implementing three utility functions using generics.
// These functions are very common patterns in typed codebases.

// ----------------------------------------------------
// 1. Create a generic function called `wrapInArray`
//    It should take a single value of any type and return an array with that value inside.

function wrapInArray<T>(value: T) {
  return [value];
}

//
//    For example:
const wrappedNumber = wrapInArray(5); // [5]
const wrappedString = wrapInArray('hello'); // ["hello"]
const wrappedBool = wrapInArray(true); // [true]

console.log(wrapInArray('test'));
//    Hint: Use a generic type parameter <T>

// ----------------------------------------------------
// 2. Create a generic function called `firstItem`
//    It should take an array of any type and return the first element of that array.
//    If the array is empty, return undefined.

function firstItem<T>(wert: T[]): T | undefined {
  return wert[0];
}

//    For example:
const name = firstItem(['Ada', 'Grace']); // "Ada"
const number = firstItem([10, 20, 30]); // 10
const none = firstItem([]); // undefined
//
//    Hint: return type should be T | undefined

// ----------------------------------------------------
// 3. Create a generic function called `mergeObjects`
//    It should take two objects and merge them into a single object.
//    The resulting object should contain all the keys and values from both.

function mergeObjects<T, U>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 };
}

//    For example:
const merged = mergeObjects({ name: 'Ada' }, { age: 36 });
//    // Result: { name: "Ada", age: 36 }
//
const result = mergeObjects({ loggedIn: true }, { role: 'admin' });
//    // Result: { loggedIn: true, role: "admin" }
//
//    Hint: Use <T, U> as generic type parameters and return T & U

// ----------------------------------------------------
// 4. Create a type alias called `ApiResponse<T>`
//    It should describe an object with:
//    - `success: boolean`
//    - `data: T`

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

//    Then use this type to define what the response of a fake API call might look like.
//
//    Example:
const userResponse: ApiResponse<{ name: string; age: number }> = {
  success: true,
  data: { name: 'Ada', age: 36 },
};
// ----------------------------------------------------
// 5. Create a generic function called `pluck`
//    It should take an object and a key, and return the value at that key.
//
//    - The object can be of any shape (use a generic type T)
//    - The key must be one of the keys of that object (use keyof T)
//    - The return type should be the type of that value (T[K])

function pluck<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

//    For example:
const user = { name: 'Ada', age: 36 };
const name2 = pluck(user, 'name'); // "Ada"
const age = pluck(user, 'age'); // 36
//
//    Hint: Function signature will look something like:
//    function pluck<T, K extends keyof T>(obj: T, key: K): ????

const someObj = {
  color: '#123456',
  author: 'J.R.R Tolkien',
  edges: 4,
};

console.log(pluck(user, 'name'));

type keys = keyof typeof someObj;

pluck(someObj, 'edges');

pluck(user, 'age');
