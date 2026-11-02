/**
 * Formats a playlist name by removing special characters and applying proper casing
 * @param rawName - The raw playlist name input
 * @param style - The formatting style ('title', 'sentence', 'upper', 'lower')
 * @returns Formatted playlist name
 */
export function formatPlaylistName(
  rawName: string,
  style: 'title' | 'sentence' | 'upper' | 'lower' = 'title'
): string {
  if (!rawName || rawName.trim() === '') {
    return 'Untitled Playlist';
  }

  // Remove special characters but keep letters, numbers, spaces, and hyphens
  let cleaned = rawName.replace(/[^\w\s-]/g, '').trim();

  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Apply formatting based on style
  switch (style) {
    case 'title':
      return cleaned
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    case 'sentence':
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    case 'upper':
      return cleaned.toUpperCase();
    case 'lower':
      return cleaned.toLowerCase();
    default:
      const exhaustiveCheck: never = style;
      throw new Error(`Unknown style: ${exhaustiveCheck}`);
  }
}
