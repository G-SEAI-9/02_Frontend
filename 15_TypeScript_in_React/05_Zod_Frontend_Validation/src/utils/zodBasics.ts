import z from 'zod';

console.log('Zod Datei läuft');

let myMessage = '          Hallo Leute               ';

// myMessage = 123;

// Ein Schema beschreibt, wie gültige Daten aussehen müssen.
// Die Methoden werden der Reihe nach angewendet: erst trim() (Leerzeichen weg), dann die Längen-Checks.
const MessageSchema = z.string().trim().min(12, { error: 'Zu kurz!' }).max(512);

// Variante 1: parse() gibt bei Erfolg die geprüften Daten zurück und throws bei Fehlern.
// Deshalb braucht man try/catch.
// try {
//   const safeMessage = MessageSchema.parse(myMessage);
//   console.log('Check passed: ', safeMessage);
// } catch (error: unknown) {
//   console.log(error.message);
// }

// Variante 2: safeParse() wirft nie, sondern liefert ein Ergebnis-Objekt.
// Über 'success' unterscheiden wir: bei true gibt es 'data', bei false gibt es 'error'. (Discriminated Union)
// const { success, data, error } = MessageSchema.safeParse(myMessage);

// if (success === true) {
//   console.log(data);
// } else {
//   // prettifyError macht aus dem Fehler-Objekt einen lesbaren Text
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

// z.object() beschreibt ein Objekt: Jeder Schlüssel bekommt sein eigenes Schema.
// Felder im Objekt, die im Schema nicht vorkommen (hier isAdmin), werden beim Parsen entfernt.
const UserSchema = z.object({
  id: z.number(),
  // .optional() erlaubt, dass das Feld fehlt (undefined). Ist es da, muss es alle Checks bestehen.
  age: z.number().positive({ error: 'Age must be positive' }).int().max(140, { error: 'Too old' }).optional(), // 32, 32.5, 900000000, -123
  name: z.string().min(1).max(128),
  email: z.email(),
  // Mehrere .regex()-Checks hintereinander: Jeder liefert bei Fehlschlag seine eigene Meldung.
  password: z
    .string()
    .min(12)
    .regex(/[a-z]/, { error: 'Password must include at least one lowercase letter.' })
    .regex(/[A-Z]/, { error: 'Password must include at least one uppercase letter.' })
    .regex(/[0-9]/, { error: 'Password must include at least one number.' })
    .regex(/[^A-Za-z0-9]/, { error: 'Password must include at least one special character.' }),

  // Schemas lassen sich verschachteln, genau wie die Daten selbst.
  address: z.object({
    street: z.string().min(1).max(512),
    // z.tuple() prüft ein Array mit fester Länge und festem Typ pro Position.
    geo: z.tuple([z.number().min(0).max(180), z.number().min(0).max(90)]),
  }),
});

// z.infer leitet den TypeScript-Typ direkt aus dem Schema ab.
// So gibt es nur eine Quelle der Wahrheit: Ändert sich das Schema, ändert sich der Typ mit.
export type User = z.infer<typeof UserSchema>;

const { success, data, error } = UserSchema.safeParse(user);

if (success === true) {
  console.log(data);
} else {
  const readableError = z.prettifyError(error);

  console.log(readableError);
}

export {};
