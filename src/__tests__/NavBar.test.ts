import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import NavBar from '../components/NavBar.svelte';
import { NAV_LINKS } from '../types/navigation';

describe('NavBar', () => {
  it('renders a nav element', () => {
    render(NavBar);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(NavBar);
    for (const link of NAV_LINKS) {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  });

  it('renders links with correct href attributes', () => {
    render(NavBar);
    for (const link of NAV_LINKS) {
      const anchor = screen.getByText(link.label).closest('a');
      expect(anchor).toHaveAttribute('href', `#${link.sectionId}`);
    }
  });

  it('renders the site name', () => {
    render(NavBar);
    expect(screen.getByText('PHR Moy')).toBeInTheDocument();
  });
});
