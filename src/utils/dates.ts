import { parseISO, format, isValid } from "date-fns";

export function formatDateString(dateString: string | null): string {
  if (!dateString) {
    console.warn("Invalid Date");
    return "";
  }

  // Try to parse the string as an ISO date
  const parsedDate = parseISO(dateString);

  // Check if the parsed date is valid
  if (!isValid(parsedDate)) {
    console.warn("Invalid Date");
    return "";
  }

  // Format the date as 'MM dd'
  return format(parsedDate, "MMM dd");
}
