import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '../components/ContactForm.svelte';

async function setInputValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string
): Promise<void> {
  // Set value directly on DOM element, then fire input event
  // This is needed because Svelte 5 reads e.target.value from the actual DOM element
  element.value = value;
  await fireEvent.input(element);
}

async function fillForm(config: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await setInputValue(
    screen.getByLabelText(/name/i) as HTMLInputElement,
    config.name
  );
  await setInputValue(
    screen.getByLabelText(/email/i) as HTMLInputElement,
    config.email
  );
  await setInputValue(
    screen.getByLabelText(/message/i) as HTMLTextAreaElement,
    config.message
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('renders a section with the contact id', () => {
    const { container } = render(ContactForm);
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(ContactForm);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders name, email, and message fields', () => {
    render(ContactForm);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(ContactForm);
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(ContactForm);
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('shows email validation error for invalid email', async () => {
    render(ContactForm);
    await fillForm({ name: 'John', email: 'invalid', message: 'Hello' });
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );
    expect(
      await screen.findByText('Please enter a valid email address')
    ).toBeInTheDocument();
  });

  it('submits form and shows success message on API success', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(ContactForm);
    await fillForm({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello there',
    });
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    render(ContactForm);
    await fillForm({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello there',
    });
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to send/i)).toBeInTheDocument();
    });
  });

  it('shows error when API returns success: false', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: false, message: 'Invalid key' }),
    } as Response);

    render(ContactForm);
    await fillForm({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello there',
    });
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to send/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    let resolvePromise: (value: Response) => void;
    const pendingPromise = new Promise<Response>((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(global.fetch).mockReturnValueOnce(pendingPromise);

    render(ContactForm);
    await fillForm({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello there',
    });
    await fireEvent.click(
      screen.getByRole('button', { name: /send message/i })
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });

    resolvePromise!({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);
  });
});
