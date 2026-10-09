const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='alert alert-error flex flex-col items-start gap-2 w-lg'>
    <span className='font-semibold'>There was an error while submitting the form:</span>
    <pre className='text-sm whitespace-pre-wrap'>{error.message}</pre>
    <button onClick={resetErrorBoundary} className='btn btn-warning btn-sm'>
      Retry
    </button>
  </div>
);

export default ErrorFallback;
