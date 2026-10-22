import z, { positive } from 'zod';

console.log('Zod Datei läuft');

let myMessage = '          Hallo Leute               ';

// myMessage = 123;

const MessageSchema = z.string().trim().min(12, { error: 'Zu kurz!' }).max(512);

// try {
//   const safeMessage = MessageSchema.parse(myMessage);
//   console.log('Check passed: ', safeMessage);
// } catch (error: unknown) {
//   console.log(error.message);
// }

// const { success, data, error } = MessageSchema.safeParse(myMessage);

// if (success === true) {
//   console.log(data);
// } else {
//   const readableError = z.prettifyError(error);

//   console.log(readableError);
// }

const user = {
  id: 123,
  // age: 32,
  name: 'Guybrush',
  email: 'mighty@pirate.gov',
  password: '12345678!0Qe',
  address: {
    street: 'Meelee Island 1',
    geo: [52, 13],
  },
  isAdmin: true,
};

const UserSchema = z.object({
  id: z.number(),
  age: z.number().positive({ error: 'Age must be positive' }).int().max(140, { error: 'Too old' }).optional(), // 32, 32.5, 900000000, -123
  name: z.string().min(1).max(128),
  email: z.email(),
  password: z
    .string()
    .min(12)
    .regex(/[a-z]/, { error: 'Password must include at least one lowercase letter.' })
    .regex(/[A-Z]/, { error: 'Password must include at least one uppercase letter.' })
    .regex(/[0-9]/, { error: 'Password must include at least one number.' })
    .regex(/[^A-Za-z0-9]/, { error: 'Password must include at least one special character.' }),

  address: z.object({
    street: z.string().min(1).max(512),
    geo: z.tuple([z.number().min(0).max(180), z.number().min(0).max(90)]),
  }),
});

export type User = z.infer<typeof UserSchema>;

const { success, data, error } = UserSchema.safeParse(user);

if (success === true) {
  console.log(data);
} else {
  const readableError = z.prettifyError(error);

  console.log(readableError);
}

export {};
