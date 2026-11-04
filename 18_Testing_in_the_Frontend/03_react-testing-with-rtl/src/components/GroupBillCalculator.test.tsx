import GroupBillCalculator from './GroupBillCalculator';

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { calculateGroupBill } from '../utils/groupBillCalculator';

vi.mock('../utils/groupBillCalculator', { spy: true });

const fillForm = ({ items = '10, 20', tip = '10', people = '3' } = {}) => {
  fireEvent.change(screen.getByLabelText(/item prices/i), { target: { value: items } });
  fireEvent.change(screen.getByLabelText(/tip/i), { target: { value: tip } });
  fireEvent.change(screen.getByLabelText(/group size/i), { target: { value: people } });
};

const submit = () => fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

describe('GroupBillCalculator', () => {
  beforeEach(() => {
    render(<GroupBillCalculator />);
  });

  afterEach(() => {
    vi.mocked(calculateGroupBill).mockReset();
  });

  describe('static rendering', () => {
    it('renders the title, all fields and the button', () => {
      expect(screen.getByRole('heading', { name: 'Split the Bill' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /item prices/i })).toBeInTheDocument();
      expect(screen.getByRole('spinbutton', { name: /tip/i })).toHaveValue(15);
      expect(screen.getByRole('spinbutton', { name: /group size/i })).toHaveValue(2);
      expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    });

    it('shows no result and no error initially', () => {
      expect(screen.queryByText(/per person/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('real calculations', () => {
    it('shows subtotal, tip, total and amount per person', async () => {
      fillForm();
      submit();
      expect(await screen.findByText('Per person: 11.00')).toBeInTheDocument();
      expect(screen.getByText('Subtotal: 30.00')).toBeInTheDocument();
      expect(screen.getByText('Tip: 3.00')).toBeInTheDocument();
      expect(screen.getByText('Total: 33.00')).toBeInTheDocument();
    });
  });

  describe('with mocked calculations', () => {
    it('passes values to the utility function', async () => {
      // render(<GroupBillCalculator />);

      fillForm({ items: ' 1.5, 2,, 3  ', tip: '18', people: '4' });
      submit();
      await screen.findByText(/per person/i);

      // expect(calculateGroupBill).toHaveBeenCalled();
      expect(calculateGroupBill).toHaveBeenCalledWith([1.5, 2, 3], 18, 4);
      // Aufräumen
      // vi.mocked(calculateGroupBill).mockReset()
    });

    it('renders whatever the util returns', async () => {
      vi.mocked(calculateGroupBill).mockReturnValue({
        subtotal: 100,
        tipAmount: 15,
        total: 115,
        perPerson: 57.5,
      });
      fillForm();
      submit();
      expect(await screen.findByText('Per person: 57.50')).toBeInTheDocument();
      expect(screen.getByText('Total: 115.00')).toBeInTheDocument();
    });

    it('shows the message when the util throws', async () => {
      vi.mocked(calculateGroupBill).mockImplementation(() => {
        throw new Error('Something went wrong');
      });
      fillForm();
      submit();
      expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
      expect(screen.queryByText(/per person/i)).not.toBeInTheDocument();
    });

    it('does not call the util when the input is invalid', async () => {
      fillForm({ items: '' });
      submit();
      await screen.findByRole('alert');
      expect(calculateGroupBill).not.toHaveBeenCalled();
    });
  });
});
