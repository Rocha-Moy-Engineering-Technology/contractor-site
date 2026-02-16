import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import App from '../App.svelte';

describe('App', () => {
  it('renders the navigation bar', () => {
    render(App);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    const { container } = render(App);
    expect(container.querySelector('#hero')).toBeInTheDocument();
  });

  it('renders the resume section', () => {
    const { container } = render(App);
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders the interests section', () => {
    const { container } = render(App);
    expect(container.querySelector('#interests')).toBeInTheDocument();
  });

  it('renders the contact section', () => {
    const { container } = render(App);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(App);
    expect(
      screen.getByRole('link', { name: /download resume/i })
    ).toBeInTheDocument();
  });
});
