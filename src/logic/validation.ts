import type { FormData, ValidationResult } from '../types/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(config: { email: string }): boolean {
  return EMAIL_REGEX.test(config.email);
}

export function validateFormData(formData: FormData): ValidationResult {
  const nameError = formData.name.trim() === '' ? 'Name is required' : '';
  const emailError =
    formData.email.trim() === ''
      ? 'Email is required'
      : validateEmail({ email: formData.email })
        ? ''
        : 'Please enter a valid email address';
  const messageError =
    formData.message.trim() === '' ? 'Message is required' : '';

  return {
    isValid: nameError === '' && emailError === '' && messageError === '',
    errors: {
      name: nameError,
      email: emailError,
      message: messageError,
    },
  };
}
