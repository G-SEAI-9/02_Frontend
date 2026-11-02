/**
 * Finds the cutest animal in an array based on a cuteness scoring system
 * @param animals - Array of animal objects with name and cuteness properties
 * @returns The animal with the highest cuteness score, or null if array is empty
 */
export type Animal = {
  name: string;
  cuteness: number;
  species: string;
};

export function findCutestAnimal(animals: Animal[]): Animal | null {
  if (animals.length === 0) {
    return null;
  }
  let cutestAnimal = animals[0];
  for (let i = 1; i < animals.length; i++) {
    if (animals[i].cuteness > cutestAnimal.cuteness) {
      cutestAnimal = animals[i];
    }
  }
  return cutestAnimal;
}
