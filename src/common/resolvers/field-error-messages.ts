export const fieldErrorMessages = {
  password_not_match: 'Passwords do not match. Please retry.',
  password_too_sort: 'Password should have seven (7) character at least.',
  category_not_match: 'Category is mandatory.',
  file_not_match: 'File is mandatory.',
  file_not_supported: (type: string) => `File not supported. Type ${type} only is accepted.`,
};
