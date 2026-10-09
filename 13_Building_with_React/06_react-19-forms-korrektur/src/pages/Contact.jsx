import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { sendContactForm } from '../api/index.js';
import { ErrorFallback, Instructions } from '../components';
import SubmitBtn from '../components/SubmitBtn.jsx';

async function contactAction(formData) {
  const result = await sendContactForm(Object.fromEntries(formData));
  toast.success(result);
}

const Contact = () => {
  return (
    <div className='flex flex-col items-center'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form action={contactAction}>
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
            <SubmitBtn>Send</SubmitBtn>
          </fieldset>
        </form>
      </ErrorBoundary>
      <Instructions path='/contact.md' />
    </div>
  );
};

export default Contact;
