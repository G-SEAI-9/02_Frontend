/**
 * Counts the number of emojis in a message string
 * @param message - The text message to analyze
 * @returns Number of emoji characters found in the message
 */
export function countEmojisInMessage(message: string): number {
  // Regular expression to match emoji characters
  // Matches a single emoji code point (base) OR an entire ZWJ sequence.
  const emojiRegex =
    /\p{Extended_Pictographic}(?:\p{EMod}?|\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\p{EMod}?|\uFE0F)?)*?/gu;

  const matches = message.match(emojiRegex);
  return matches ? matches.length : 0;
}
