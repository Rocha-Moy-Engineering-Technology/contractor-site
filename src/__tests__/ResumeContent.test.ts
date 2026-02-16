import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ResumeContent from '../components/ResumeContent.svelte';
import {
  EDUCATION_ENTRIES,
  EXPERIENCE_ENTRIES,
  PORTFOLIO_ENTRIES,
} from '../types/resume';

describe('ResumeContent', () => {
  it('renders a section with the resume id', () => {
    const { container } = render(ResumeContent);
    const section = container.querySelector('#resume');
    expect(section).toBeInTheDocument();
  });

  it('renders all experience entry titles', () => {
    render(ResumeContent);
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
    }
  });

  it('renders all unique experience entry companies', () => {
    render(ResumeContent);
    const uniqueCompanies = [
      ...new Set(EXPERIENCE_ENTRIES.map((e) => e.company)),
    ];
    for (const company of uniqueCompanies) {
      const elements = screen.getAllByText(company);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it('renders all unique experience entry date ranges', () => {
    render(ResumeContent);
    const uniqueDates = [...new Set(EXPERIENCE_ENTRIES.map((e) => e.dates))];
    for (const dates of uniqueDates) {
      const elements = screen.getAllByText(dates);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it('renders technology tags for experience entries', () => {
    const { container } = render(ResumeContent);
    const tags = container.querySelectorAll('.bg-tag-bg');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('renders portfolio entry title', () => {
    render(ResumeContent);
    expect(screen.getByText(PORTFOLIO_ENTRIES[0].title)).toBeInTheDocument();
  });

  it('renders portfolio entry link', () => {
    render(ResumeContent);
    const link = screen.getByRole('link', { name: PORTFOLIO_ENTRIES[0].title });
    expect(link).toHaveAttribute('href', PORTFOLIO_ENTRIES[0].url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders all education entries', () => {
    render(ResumeContent);
    for (const entry of EDUCATION_ENTRIES) {
      expect(screen.getByText(entry.degree)).toBeInTheDocument();
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
    }
  });
});
