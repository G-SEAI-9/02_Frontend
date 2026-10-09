import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, Instructions } from '../components';

const Contact = () => {
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4'>
            <legend className='fieldset-legend'>Contact Us</legend>
            <label className='label' htmlFor='firstName'>
              First Name
            </label>
            <input className='input w-full' name='firstName' placeholder='First Name' id='firstName' />
            <label className='label' htmlFor='lastname'>
              Last Name
            </label>
            <input className='input w-full' name='lastName' placeholder='Last Name' id='lastName' />
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input className='input w-full' name='email' placeholder='Email' id='email' />
            <label className='label' htmlFor='message'>
              Message
            </label>
            <textarea className='textarea w-full' name='message' placeholder='Your message' rows={4} id='message' />
            <button className='btn btn-neutral mt-4' type='submit'>
              Send
            </button>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/contact.md' />
    </div>
  );
};

export default Contact;
