import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Footer from '../components/Footer.svelte';

describe('Footer', () => {
  it('renders a PDF download link', () => {
    render(Footer);
    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link).toHaveAttribute('href', '/resume.pdf');
    expect(link).toHaveAttribute('download');
  });

  it('renders a copyright notice', () => {
    render(Footer);
    expect(screen.getByText(/Pedro Henrique Rocha Moy/)).toBeInTheDocument();
  });
});
