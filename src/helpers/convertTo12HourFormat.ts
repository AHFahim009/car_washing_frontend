/* eslint-disable prefer-const */
export function convertTo12HourFormat(time: string) {
  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format, and handle the 12 AM/PM case

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}