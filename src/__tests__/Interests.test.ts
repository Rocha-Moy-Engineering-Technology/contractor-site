import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Interests from '../components/Interests.svelte';
import { INTERESTS } from '../types/interests';

describe('Interests', () => {
  it('renders a section with the interests id', () => {
    const { container } = render(Interests);
    const section = container.querySelector('#interests');
    expect(section).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(Interests);
    expect(screen.getByText('Professional Interests')).toBeInTheDocument();
  });

  it('renders all interest labels', () => {
    render(Interests);
    for (const interest of INTERESTS) {
      expect(screen.getByText(interest.label)).toBeInTheDocument();
    }
  });

  it('renders all interest descriptions', () => {
    render(Interests);
    for (const interest of INTERESTS) {
      expect(screen.getByText(interest.description)).toBeInTheDocument();
    }
  });
});
