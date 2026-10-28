//  Remote Procedure Call - Alternative tum fetch()
'use server';

import { z } from 'zod';
import { updateBook } from './data';
import { updateTag } from 'next/cache';

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

async function editBook(_prevState: EditBooksState, formData: FormData): Promise<EditBooksState> {
  // Eingabe Validieren

  const result = bookSchema.safeParse(Object.fromEntries(formData));

  // Wenn Fehler -> zurück ans Fontend
  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
      values: {
        title: String(formData.get('title')),
        release_year: String(formData.get('release_year')),
      },
    };
  }
  // Keine Fehler -> DB
  const { id, title, release_year } = result.data;
  updateBook(id, title, release_year);

  updateTag('books');
  // Erfolgsnachricht ans Frontend
  return { success: true };
}

export { editBook };
