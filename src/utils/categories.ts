export const categories = [
  'Front-end',
  'Back-end',
  'Debugging',
  'Server Configuration'
];

export const isValidCategory = (category: string): boolean => {
  return categories.includes(category);
};