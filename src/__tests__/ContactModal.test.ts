import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ContactModal from '../components/ContactModal.svelte';
import { ModalState } from '../types/modal';

describe('ContactModal', () => {
  const mockOnClose = vi.fn();

  it('renders nothing when state is Closed', () => {
    const { container } = render(ContactModal, {
      props: { state: ModalState.Closed, onclose: mockOnClose },
    });
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('renders dialog when state is Open', () => {
    const { container } = render(ContactModal, {
      props: { state: ModalState.Open, onclose: mockOnClose },
    });
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('renders heading and form when open', () => {
    render(ContactModal, {
      props: { state: ModalState.Open, onclose: mockOnClose },
    });
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders close button that calls onclose', async () => {
    render(ContactModal, {
      props: { state: ModalState.Open, onclose: mockOnClose },
    });
    const closeButton = screen.getByRole('button', {
      name: /close contact form/i,
    });
    await fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('closes on Escape key', async () => {
    render(ContactModal, {
      props: { state: ModalState.Open, onclose: mockOnClose },
    });
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
