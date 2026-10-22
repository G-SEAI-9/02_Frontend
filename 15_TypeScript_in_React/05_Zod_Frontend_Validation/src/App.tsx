import { useActionState } from 'react';
import { FormSchema, sleep } from './utils/index';
import z from 'zod';

const initialState = {
  input: {
    name: '',
    email: '',
    number: '',
    message: '',
  },
  errors: {
    name: '',
    email: '',
    number: '',
    message: '',
  },
  success: false,
};

type FormState = typeof initialState;

async function action(_prevState: FormState, formData: FormData) {
  // const data = {
  //   name: String(formData.get('name') ?? ''),
  //   email: String(formData.get('email') ?? ''),
  //   message: String(formData.get('message') ?? ''),
  // };

  const zodResponse = FormSchema.safeParse(Object.fromEntries(formData));

  const { success, data: parsedData, error: validationErrors } = zodResponse;

  if (success) {
    // Netzwerkrequest
    // fetch("/api/blabla", {
    //   method: "POST",
    //   body: JSON.stringify(parsedData)
    // })

    return {
      ...initialState,
      success: true,
    };
  } else {
    const errorMessages = z.flattenError(validationErrors).fieldErrors;

    return {
      errors: {
        ...initialState.errors,
        ...errorMessages,
      },
      input: parsedData,
      success: false,
    };
  }
}

export default function App() {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow'>
        <h2 className='text-center text-2xl font-bold text-gray-200'>Contact Us</h2>

        <form className='space-y-4' action={formAction}>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
              Name
            </label>
            <input
              name='name'
              id='name'
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='Leia Organa'
              defaultValue={state?.input?.name}
            />
            {state?.errors?.name && <p className='mt-1 text-sm text-red-600'>{state.errors.name}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              id='email'
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='leia@rebellion.org'
              defaultValue={state?.input?.email}
            />
            {state?.errors?.email && <p className='mt-1 text-sm text-red-600'>{state.errors.email}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='number'>
              Number
            </label>
            <input
              name='number'
              type='number'
              id='number'
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='0-123'
              defaultValue={state?.input?.number}
            />
            {state?.errors?.number && <p className='mt-1 text-sm text-red-600'>{state.errors.number[0]}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='message'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              rows={4}
              className='mt-1 w-full rounded border border-gray-300 px-3 py-2'
              placeholder='Tell us how we can help...'
              defaultValue={state?.input?.message}
            />
            {state?.errors?.message && <p className='mt-1 text-sm text-red-600'>{state.errors.message}</p>}
          </div>

          {state?.success && <p className='text-sm text-green-500'>Thanks for your Message!</p>}

          <button
            type='submit'
            disabled={isPending}
            className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 ${
              isPending ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
