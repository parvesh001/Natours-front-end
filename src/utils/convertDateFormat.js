export default function convertDateFormat(originalDateString) {
  const originalDate = new Date(originalDateString);

  // Extract year, month, and day from the original date
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  // Convert year, month, and day into string with two-digit format
  const yearString = year.toString().slice();
  const monthString = month < 10 ? `0${month}` : month.toString();
  const dayString = day < 10 ? `0${day}` : day.toString();

  // Combine year, month, and day into "yy-mm-dd" format
  const formattedDate = `${yearString}-${monthString}-${dayString}`;

  return formattedDate; // Output: "2021-06-19"
}
