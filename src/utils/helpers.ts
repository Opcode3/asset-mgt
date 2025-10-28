export function getSingleName(fullName: string): string {
  const names = fullName.split(" ");
  return names[0];
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatReadableDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short", // e.g., "Tue"
    year: "numeric", // "2025"
    month: "long", // "October"
    day: "numeric", // "28"
    hour: "2-digit", // "05"
    minute: "2-digit", // "23"
    second: "2-digit", // "12"
    hour12: true, // 12-hour clock
  });
}
