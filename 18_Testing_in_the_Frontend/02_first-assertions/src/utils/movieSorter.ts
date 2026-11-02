/**
 * Sorts an array of movie objects by different criteria
 * @param movies - Array of movie objects to sort
 * @param sortBy - Criteria to sort by ('title', 'year', 'rating', 'duration')
 * @param order - Sort order ('asc' for ascending, 'desc' for descending)
 * @returns New sorted array (original array is not modified)
 */
export type Movie = {
  title: string;
  year: number;
  rating: number;
  duration: number; // in minutes
  genre: string;
};

export function sortMovies(
  movies: Movie[],
  sortBy: 'title' | 'year' | 'rating' | 'duration',
  order: 'asc' | 'desc' = 'asc'
): Movie[] {
  // Create a copy to avoid mutating the original array
  const moviesCopy = [...movies];

  return moviesCopy.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'duration':
        comparison = a.duration - b.duration;
        break;
      default:
        const exhaustiveCheck: never = sortBy;
        throw new Error(`Unsupported sortBy value: ${exhaustiveCheck}`);
    }

    return order === 'desc' ? -comparison : comparison;
  });
}
