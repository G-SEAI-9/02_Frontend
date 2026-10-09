import { useFormStatus } from 'react-dom';

export default function SubmitBtn({ children }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className='btn btn-neutral mt-4' type='submit'>
      {pending ? <span className='loading loading-ring loading-xl'></span> : <span>{children}</span>}
    </button>
  );
}
