export const APP_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_SIZES: [5, 10, 25, 50, 100],
  DATE_FORMAT: 'DD-MMMM-YYYY',
  API_TIMEOUT: 30000,
  DEBOUNCE_TIME: 300,
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  DEFAULT_LOCALE: 'en-US',
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  MINLENGTH: (min: number) => `Minimum ${min} characters required`,
  MAXLENGTH: (max: number) => `Maximum ${max} characters allowed`,
  MIN: (min: number) => `Value must be at least ${min}`,
  MAX: (max: number) => `Value must be at most ${max}`,
  PATTERN: 'Please enter a valid format',
  MATCH_FIELD: 'Fields do not match',
};

export const COLORS = {
  PRIMARY: '#3f51b5',
  ACCENT: '#ff4081',
  WARN: '#f44336',
  SUCCESS: '#4caf50',
  INFO: '#2196f3',
  WARNING: '#ff9800',
};
