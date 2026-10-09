import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { registerNewsletter } from '../api/index.js';
import { ErrorFallback, Instructions } from '../components';
import SubmitBtn from '../components/SubmitBtn.jsx';

const action = async (formData) => {
  const email = formData.get('email');
  try {
    const result = await registerNewsletter(email);
    toast.success(result);
  } catch (error) {
    toast.error(error.message);
  }
};

const Register = () => {
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={action}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Register to our newsletter</legend>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input className='input w-full' name='email' placeholder='Email' id='email' />
            {/* <button className='btn btn-neutral mt-4' type='submit'>
              Register!
            </button> */}
            <SubmitBtn>Register</SubmitBtn>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/register.md' />
    </div>
  );
};

export default Register;
