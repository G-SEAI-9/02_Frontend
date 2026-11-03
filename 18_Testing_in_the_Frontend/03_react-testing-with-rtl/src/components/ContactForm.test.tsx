import ContactForm from './ContactForm';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

function fillForm({ name = 'Guybrush', email = 'mighty@pirate.gov', message = 'Hello' } = {}) {
  const nameEl = screen.getByLabelText(/name/i);
  fireEvent.change(nameEl, { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: message } });
}

function submitForm() {
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
}

describe('ContactForm', () => {
  beforeEach(() => {
    render(<ContactForm />);
  });

  describe('Static Rendering', () => {
    it('renders the contact form heading', () => {
      expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
    });

    it('contains name, email, message, subscribe and submit form controls', () => {
      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /subscribe to newsletter/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('has correct placeholders and labels', () => {
      expect(screen.getByLabelText('Name *')).toHaveAttribute('placeholder', 'Enter your name');
      expect(screen.getByLabelText('Email *')).toHaveAttribute('placeholder', 'Enter your email');
      expect(screen.getByLabelText('Message *')).toHaveAttribute('placeholder', 'Enter your message');
      expect(screen.getByLabelText('Subscribe to newsletter')).not.toBeChecked();
    });
  });

  describe('validation errors', () => {
    it('shows "Name is required" when name is empty', async () => {
      fillForm({ name: '' });
      submitForm();
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
    });

    it('shows "Email is required" when email is empty', async () => {
      fillForm({ email: '' });
      submitForm();
      expect(await screen.findByText('Email is required')).toBeInTheDocument();
    });

    it('shows "Email is invalid" for an invalid email format', async () => {
      fillForm({ email: 'not-an-email' });
      submitForm();
      expect(await screen.findByText('Email is invalid')).toBeInTheDocument();
    });

    it('shows "Message is required" when message is empty', async () => {
      fillForm({ message: '' });
      submitForm();
      expect(await screen.findByText('Message is required')).toBeInTheDocument();
    });

    it('shows multiple validation errors at once', async () => {
      submitForm();
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  describe('Successful Submission Behavior', () => {
    it('shows the success message', async () => {
      // formular ausfüllen
      fillForm();

      // formular abschicken
      submitForm();
      // assert

      expect(await screen.findByRole('heading', { name: /thank you for your message/i }, { timeout: 3000 }));
    });
  });

  // describe('Submission State', () => {});

  describe('field highlighting', () => {
    it('adds error classes to fields with errors', async () => {
      submitForm();
      await screen.findByText('Name is required');
      expect(screen.getByLabelText(/name/i)).toHaveClass('input-error');
      expect(screen.getByLabelText(/email/i)).toHaveClass('input-error');
      expect(screen.getByLabelText(/message/i)).toHaveClass('textarea-error');
    });

    it('keeps default styling on fields without errors', async () => {
      fillForm({ email: '' });
      submitForm();
      await screen.findByText('Email is required');
      expect(screen.getByLabelText(/name/i)).not.toHaveClass('input-error');
      expect(screen.getByLabelText(/message/i)).not.toHaveClass('textarea-error');
    });
  });

  // describe('Accessibility & Roles', () => {});
});
