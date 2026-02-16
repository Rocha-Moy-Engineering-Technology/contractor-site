export enum FormState {
  Idle = 'Idle',
  Filling = 'Filling',
  ValidationError = 'ValidationError',
  Submitting = 'Submitting',
  Success = 'Success',
  SubmissionError = 'SubmissionError',
}

export interface FormData {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface FormErrors {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: FormErrors;
}

export const EMPTY_FORM_DATA: FormData = {
  name: '',
  email: '',
  message: '',
} as const;

export const EMPTY_FORM_ERRORS: FormErrors = {
  name: '',
  email: '',
  message: '',
} as const;
