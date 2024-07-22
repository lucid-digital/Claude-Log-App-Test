export const PREDEFINED_CATEGORIES = [
  "Front-end",
  "Back-end",
  "Database",
  "Research",
  "Debugging",
  "Server Configuration"
];

export const isValidCategory = (category: string): boolean => {
  return PREDEFINED_CATEGORIES.includes(category);
};