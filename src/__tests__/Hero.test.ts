import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Hero from '../components/Hero.svelte';
import { PROFILE } from '../types/resume';

describe('Hero', () => {
  it('renders the profile name', () => {
    render(Hero);
    expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
  });

  it('renders the professional title', () => {
    render(Hero);
    expect(screen.getByText(PROFILE.title)).toBeInTheDocument();
  });

  it('renders a profile image', () => {
    render(Hero);
    const img = screen.getByAltText(PROFILE.name);
    expect(img).toBeInTheDocument();
  });

  it('renders a GitHub link that opens in new tab', () => {
    render(Hero);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('href', PROFILE.github);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a LinkedIn link that opens in new tab', () => {
    render(Hero);
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute('href', PROFILE.linkedin);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the summary text', () => {
    render(Hero);
    expect(screen.getByText(PROFILE.summary)).toBeInTheDocument();
  });
});
