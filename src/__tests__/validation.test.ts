import { describe, expect, it } from 'vitest';
import { validateEmail, validateFormData } from '../logic/validation';
import type { FormData } from '../types/contact';

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail({ email: 'user@example.com' })).toBe(true);
  });

  it('returns true for email with subdomain', () => {
    expect(validateEmail({ email: 'user@mail.example.com' })).toBe(true);
  });

  it('returns true for email with plus addressing', () => {
    expect(validateEmail({ email: 'user+tag@example.com' })).toBe(true);
  });

  it('returns true for email with dots in local part', () => {
    expect(validateEmail({ email: 'first.last@example.com' })).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(validateEmail({ email: '' })).toBe(false);
  });

  it('returns false for missing @ symbol', () => {
    expect(validateEmail({ email: 'userexample.com' })).toBe(false);
  });

  it('returns false for missing domain', () => {
    expect(validateEmail({ email: 'user@' })).toBe(false);
  });

  it('returns false for missing local part', () => {
    expect(validateEmail({ email: '@example.com' })).toBe(false);
  });

  it('returns false for missing TLD', () => {
    expect(validateEmail({ email: 'user@example' })).toBe(false);
  });

  it('returns false for spaces in email', () => {
    expect(validateEmail({ email: 'user @example.com' })).toBe(false);
  });

  it('returns false for multiple @ symbols', () => {
    expect(validateEmail({ email: 'user@@example.com' })).toBe(false);
  });
});

describe('validateFormData', () => {
  const validFormData: FormData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello there',
  };

  it('returns valid for all fields filled correctly', () => {
    const result = validateFormData(validFormData);
    expect(result.isValid).toBe(true);
    expect(result.errors.name).toBe('');
    expect(result.errors.email).toBe('');
    expect(result.errors.message).toBe('');
  });

  it('returns invalid when name is empty', () => {
    const result = validateFormData({ ...validFormData, name: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBe('');
    expect(result.errors.message).toBe('');
  });

  it('returns invalid when name is whitespace only', () => {
    const result = validateFormData({ ...validFormData, name: '   ' });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeTruthy();
  });

  it('returns invalid when email is empty', () => {
    const result = validateFormData({ ...validFormData, email: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it('returns invalid when email format is wrong', () => {
    const result = validateFormData({
      ...validFormData,
      email: 'not-an-email',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it('returns invalid when message is empty', () => {
    const result = validateFormData({ ...validFormData, message: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeTruthy();
  });

  it('returns invalid when message is whitespace only', () => {
    const result = validateFormData({ ...validFormData, message: '   ' });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeTruthy();
  });

  it('returns multiple errors when all fields are empty', () => {
    const result = validateFormData({ name: '', email: '', message: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.message).toBeTruthy();
  });
});
