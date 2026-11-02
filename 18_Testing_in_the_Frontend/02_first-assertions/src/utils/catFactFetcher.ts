/**
 * Simulates fetching a random cat fact from an API
 * @param includeBreeds - Whether to include breed-specific facts
 * @returns Promise that resolves to a cat fact string
 */
export async function fetchRandomCatFact(includeBreeds: boolean = true): Promise<string> {
  const generalFacts = [
    'Cats sleep 12-16 hours per day',
    'A group of cats is called a clowder',
    'Cats have five toes on their front paws but only four on their back paws',
    'Cats can rotate their ears 180 degrees',
    "A cat's purr vibrates at a frequency that promotes bone healing"
  ];

  const breedFacts = [
    'Maine Coons are the largest domestic cat breed',
    'Siamese cats are known for being very vocal',
    'Persian cats require daily grooming due to their long fur',
    'Bengal cats have wild leopard ancestry'
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

  const allFacts = includeBreeds ? [...generalFacts, ...breedFacts] : generalFacts;
  const randomIndex = Math.floor(Math.random() * allFacts.length);

  return allFacts[randomIndex];
}
