// Vorher: Validierung von Hand. Jede Regel braucht ein eigenes if, und der Typ muss separat gepflegt werden.
// type ErrorFields = {
//   name: string;
//   email: string;
//   message: string;
// };

import z from 'zod';

// export const validate = ({ name, email, message }: ErrorFields) => {
//   const newErrors: Partial<ErrorFields> = {};

//   if (!name.trim()) newErrors.name = 'Name is required.';
//   if (!email.trim()) {
//     newErrors.email = 'Email is required.';
//   } else if (!/\S+@\S+\.\S+/.test(email)) {
//     newErrors.email = 'Invalid email format.';
//   }
//   if (!message.trim()) newErrors.message = 'Message is required.';
//   return newErrors;
// };

// Nachher: Dieselben Regeln als Zod-Schema. Die Fehlermeldungen stehen direkt bei der Regel.
// Alle Werte aus einem Formular kommen als String an, deshalb beginnt jedes Feld mit z.string().
export const FormSchema = z.object({
  name: z.string().trim().min(1, { error: 'Name is required' }).max(128, { error: 'Name is too long' }),
  // .pipe() reicht den getrimmten String an das nächste Schema weiter.
  // So wird erst getrimmt und danach das E-Mail-Format geprüft.
  email: z
    .string()
    .trim()
    .min(1, { error: 'Email required' })
    .pipe(z.email({ error: 'Invalid email' })),

  // Erst prüfen, dass etwas eingegeben wurde, dann mit z.coerce.number() den String in eine Zahl umwandeln.
  // Ohne den min(1)-Check würde ein leeres Feld zu 0 umgewandelt und als gültig durchgehen.
  number: z
    .string()
    .trim()
    .min(1, { error: 'Number required' })
    .pipe(z.coerce.number({ error: 'Must be a number' })),

  message: z
    .string()
    .trim()
    .min(1, { error: 'Message is required' })
    .max(2000, { error: 'Message is too long. Max 2000 characters' }),
});

// Der Typ der _geparsten_ Daten: 'number' ist hier schon eine Zahl, kein String mehr.
export type FormType = z.infer<typeof FormSchema>;

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
