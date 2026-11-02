/**
 * Generates a secure password based on specified criteria
 * @param length - Desired password length (minimum 4)
 * @param options - Object specifying character types to include
 * @returns Generated password string
 */
export type PasswordOptions = {
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
};

export function generateSecurePassword(length: number, options: PasswordOptions = {}): string {
  if (length < 4) {
    throw new Error('Password length must be at least 4 characters');
  }

  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = false
  } = options;

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let availableChars = '';
  if (includeUppercase) availableChars += uppercaseChars;
  if (includeLowercase) availableChars += lowercaseChars;
  if (includeNumbers) availableChars += numberChars;
  if (includeSymbols) availableChars += symbolChars;

  if (availableChars === '') {
    throw new Error('At least one character type must be enabled');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}
