import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import App from '../App.svelte';

describe('App', () => {
  it('renders the navigation bar', () => {
    render(App);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the profile column with name', () => {
    render(App);
    expect(
      screen.getByRole('heading', { name: /Pedro Henrique Rocha Moy/i })
    ).toBeInTheDocument();
  });

  it('renders the resume section', () => {
    const { container } = render(App);
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders download resume link in navbar', () => {
    render(App);
    expect(
      screen.getByRole('link', { name: /download resume/i })
    ).toBeInTheDocument();
  });

  it('renders contact button in navbar', () => {
    render(App);
    expect(
      screen.getByRole('button', { name: /contact/i })
    ).toBeInTheDocument();
  });

  it('renders two-column layout', () => {
    const { container } = render(App);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main?.querySelector('aside')).toBeInTheDocument();
    expect(main?.querySelector('#resume')).toBeInTheDocument();
  });
});
