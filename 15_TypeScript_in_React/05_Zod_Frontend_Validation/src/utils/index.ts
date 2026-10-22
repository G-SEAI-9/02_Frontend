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

export const FormSchema = z.object({
  name: z.string().trim().min(1, { error: 'Name is required' }).max(128, { error: 'Name is too long' }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: 'Invalid email' })),

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

export type FormType = z.infer<typeof FormSchema>;

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
