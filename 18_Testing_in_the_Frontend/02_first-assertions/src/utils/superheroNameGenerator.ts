/**
 * Generates a random superhero name by combining adjectives and nouns
 * @param includeTitle - Whether to include titles like "Captain" or "Doctor"
 * @returns A randomly generated superhero name
 */
export function generateSuperheroName(includeTitle: boolean = false): string {
  const adjectives = [
    'Mighty',
    'Swift',
    'Brave',
    'Silent',
    'Golden',
    'Thunder',
    'Shadow',
    'Crimson'
  ];
  const nouns = ['Falcon', 'Tiger', 'Storm', 'Blade', 'Phoenix', 'Wolf', 'Eagle', 'Panther'];
  const titles = ['Captain', 'Doctor', 'Professor', 'Agent', 'Master', 'Lady', 'Sir'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  let heroName = `${randomAdjective} ${randomNoun}`;
  if (includeTitle) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    heroName = `${randomTitle} ${heroName}`;
  }
  return heroName;
}
