export function getSingleName(fullName: string): string {
  const names = fullName.split(" ");
  return names[0];
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}
