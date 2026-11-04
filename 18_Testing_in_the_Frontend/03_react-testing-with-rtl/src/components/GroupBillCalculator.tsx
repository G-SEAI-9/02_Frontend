import { useActionState } from 'react';
import { calculateGroupBill, type BillCalculation } from '../utils/groupBillCalculator';

type ActionState = {
  values: { items: string; tip: string; people: string };
  result: BillCalculation | null;
  error: string;
};

const calculateAction = (_prevState: ActionState, formData: FormData): ActionState => {
  const values = {
    items: (formData.get('items') as string) ?? '',
    tip: (formData.get('tip') as string) ?? '',
    people: (formData.get('people') as string) ?? '',
  };
  const items = values.items
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number);
  const tip = Number(values.tip);
  const people = Number(values.people);

  if (items.length === 0 || [...items, tip, people].some(Number.isNaN)) {
    return { values, result: null, error: 'Please enter valid numbers' };
  }
  try {
    //

    return { values, result: calculateGroupBill(items, tip, people), error: '' };
    // return { values, result: { subtotal: 6.5, tipAmount: 1.17, total: 7.67, perPerson: 1.92 }, error: '' };
  } catch (err) {
    return { values, result: null, error: (err as Error).message };
  }
};

const GroupBillCalculator = () => {
  const [{ values, result, error }, formAction] = useActionState<ActionState, FormData>(calculateAction, {
    values: { items: '', tip: '15', people: '2' },
    result: null,
    error: '',
  });

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Split the Bill</h2>
        <form action={formAction} noValidate>
          <div className='form-control w-full'>
            <label htmlFor='items' className='label'>
              <span className='label-text'>Item prices *</span>
            </label>
            <textarea
              id='items'
              name='items'
              className={`textarea textarea-bordered w-full h-24 ${error ? 'textarea-error' : ''}`}
              placeholder='e.g. 12.50, 8, 23.90'
              defaultValue={values.items}
            />
          </div>
          <div className='form-control w-full'>
            <label htmlFor='tip' className='label'>
              <span className='label-text'>Tip (%)</span>
            </label>
            <input
              id='tip'
              name='tip'
              type='number'
              min='0'
              className='input input-bordered w-full'
              defaultValue={values.tip}
            />
          </div>
          <div className='form-control w-full'>
            <label htmlFor='people' className='label'>
              <span className='label-text'>Group size *</span>
            </label>
            <input
              id='people'
              name='people'
              type='number'
              min='1'
              className='input input-bordered w-full'
              defaultValue={values.people}
            />
          </div>
          {error && (
            <label className='label'>
              <span className='label-text-alt text-error' role='alert'>
                {error}
              </span>
            </label>
          )}
          <div className='card-actions justify-end mt-4'>
            <button type='submit' className='btn btn-primary'>
              Calculate
            </button>
          </div>
        </form>
        {result && (
          <div className='mt-4 space-y-1'>
            <p>Subtotal: {result.subtotal.toFixed(2)}</p>
            <p>Tip: {result.tipAmount.toFixed(2)}</p>
            <p>Total: {result.total.toFixed(2)}</p>
            <p className='text-lg font-bold text-primary'>Per person: {result.perPerson.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupBillCalculator;
