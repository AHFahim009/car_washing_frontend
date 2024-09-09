/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
export const convertTo12Hour = (time: string) => {
  let [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  const hourFormat = hour.toString().padStart(2, "0");
  const minuteFormat = minute.toString().padStart(2, "0");

  return `${hourFormat}:${minuteFormat} ${ampm}`;
};



export const calculateTimeDifference = (booking: any) => {

  const slotStartDateTime = new Date(`${booking.slot.date}T${booking.slot.startTime}`);
  const currentDateTime = new Date();

  const timeDifferenceMs = slotStartDateTime.getTime() - currentDateTime.getTime();

  if (timeDifferenceMs > 0) {
    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} remaining`;
    } else {
      const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);
      return `${hours.toString().padStart(2, "0")} hour : ${minutes.toString().padStart(2, "0")} minute : ${seconds.toString().padStart(2, "0")} second`;
    }
  } else {
    return "time out";
  }


};