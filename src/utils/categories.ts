export const PREDEFINED_CATEGORIES = [
  "Front-end",
  "Back-end",
  "Full-stack",
  "Design",
  "Testing"
];

export const isValidCategory = (category: string): boolean => {
  return PREDEFINED_CATEGORIES.includes(category);
};