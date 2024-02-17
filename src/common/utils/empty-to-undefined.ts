export const emptyToUndefined = (value?: string) => {
  if (value && value.length > 0) return value;
  return undefined;
};
