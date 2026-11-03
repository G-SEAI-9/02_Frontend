import Counter from './Counter';
import { describe, expect, it, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

test('ein erster Test', () => {
  // Arrage/Act
  const result = render(<Counter />);
  const heading = screen.getByRole('heading', { name: /counter component/i });

  const oldHeading = screen.queryByRole('heading', { name: /old test component/i });

  // Assert
  expect(heading).toBeInTheDocument();
  expect(oldHeading).not.toBeInTheDocument();
});

describe('Counter Component', () => {
  test('renders with initial value of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('rendes with initial value', () => {
    const INITI_VAL = 42;
    render(<Counter initialValue={INITI_VAL} />);
    expect(screen.getByText(INITI_VAL)).toBeInTheDocument();
  });

  test('renders all three buttons', () => {
    render(<Counter />);
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('render notification when counter at 0', () => {
    render(<Counter initialValue={0} />);
    expect(screen.getByText(/counter is at zero!/i)).toBeInTheDocument();
  });
});

describe('Counter Component Functionality', () => {
  test('increments counter when + button is clicked', async () => {
    render(<Counter />);
    const plusBtn = screen.getByRole('button', { name: '+' });
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);

    const counterEl = await screen.queryByText('5');
    expect(counterEl).toBeInTheDocument();
  });

  test('decrements counter when - button is clicked', () => {
    // Arrange
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByRole('button', { name: '-' });
    // Act
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  test('resets counter to initial value when reset button is clicked', () => {
    // Arrange
    render(<Counter initialValue={3} />);
    const incrementBtn = screen.getByRole('button', { name: '+' });
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    // Act
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(resetBtn);
    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

describe('Counter Component Button States', () => {
  test('minus button is disablew when count at 0', () => {
    render(<Counter initialValue={0} />);
    const minusBtn = screen.getByRole('button', { name: '-' });
    expect(minusBtn).toBeDisabled();
  });
});
