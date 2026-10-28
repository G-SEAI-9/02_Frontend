// Remote Procedure Call - Alternative zu fetch() + eigenem API-Endpunkt.
// 'use server' macht jede exportierte Funktion zur Server Action:
// Der Client bekommt nur eine Referenz, Next erzeugt den POST-Request dafür selbst.
// Gedacht für Data Mutations (Schreiben); Next schickt sie pro Client nacheinander ab.
'use server';

import { z } from 'zod';
import { updateBook } from './data';
import { updateTag } from 'next/cache';

// Server Actions sind öffentlich aufrufbar -> Eingaben _immer_ auf dem Server validieren. (Auch wenn schon im Browser validiert!)
// z.coerce wandelt die Strings aus FormData in Zahlen um.
const bookSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().trim().min(1, 'Bitte einen Titel eingeben').max(200, 'Der Titel ist zu lang'),
  release_year: z.coerce
    .number({ error: 'Bitte eine Zahl eingeben' })
    .int('Bitte eine ganze Zahl eingeben')
    .min(1, 'Bitte ein Jahr eingeben')
    .max(new Date().getFullYear(), 'Das Jahr liegt in der Zukunft'),
});

// Data Transfer Object - DTO
// Das gibt die Action an useActionState zurück -> wird zu `state` im Formular.
export type EditBooksState = {
  success?: boolean;
  errors?: {
    title?: string[];
    release_year?: string[];
  };
  values?: {
    title: string;
    release_year: string;
  };
};

// Signatur für useActionState: (vorheriger State, FormData) => neuer State
async function editBook(_prevState: EditBooksState, formData: FormData): Promise<EditBooksState> {
  // Eingabe Validieren

  const result = bookSchema.safeParse(Object.fromEntries(formData));

  // Wenn Fehler -> zurück ans Fontend
  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
      // Eingaben zurückschicken, damit das Formular sie nach dem Fehler wieder anzeigt
      values: {
        title: String(formData.get('title')),
        release_year: String(formData.get('release_year')),
      },
    };
  }
  // Keine Fehler -> DB
  const { id, title, release_year } = result.data;
  await updateBook(id, title, release_year);

  // Cache mit Tag 'books' sofort verwerfen -> Liste und Detailseite zeigen die Änderung
  updateTag('books');
  // Erfolgsnachricht ans Frontend
  return { success: true };
}

export { editBook };
