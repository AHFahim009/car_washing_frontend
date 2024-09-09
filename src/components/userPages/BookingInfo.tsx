/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

// Mock booking data (will come from your database)
const bookingData = [
  {
    _id: 1,
    startTime: 10.0,
    endTime: 11.0,
    date: "2024-09-12",
    serviceName: "car wash 1",
    status: "booked",
  },
  {
    _id: 2,
    startTime: 11.0,
    endTime: 12.0,
    date: "2024-09-06",
    serviceName: "car was 2",
    status: "booked",
  },
  {
    _id: 3,
    startTime: 12.0,
    endTime: 13.0,
    date: "2024-08-12",
    serviceName: "car wash 3",
    status: "booked",
  },
  {
    _id: 4,
    startTime: 3.0,
    endTime: 4.0,
    date: "2024-09-09",
    serviceName: "car wash 4",
    status: "booked",
  },
  {
    _id: 5,
    startTime: 3.0,
    endTime: 4.0,
    date: "2024-08-09",
    serviceName: "car wash 5",
    status: "booked",
  },
  {
    _id: 6,
    startTime: 11.0,
    endTime: 1.0,
    date: "2024-09-12",
    serviceName: "car wash 6",
    status: "booked",
  },

  {
    _id: 7,
    startTime: 18.47,
    endTime: 19.00,
    date: "2024-09-06",
    serviceName: "car wash 7",
    status: "booked",
  },
];

// Helper function to convert 24-hour time to 12-hour time
const convertTo12Hour = (time: number) => {
  const suffix = time >= 12 ? "PM" : "AM";
  const hour12 = time % 12 || 12;
  return `${hour12}:00 ${suffix}`;
};

// Helper function to calculate countdown (for hours, minutes, and seconds)
const getCountdown = (targetTime: Date) => {
  const currentTime = new Date();
  const diff = targetTime.getTime() - currentTime.getTime();

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { hours, minutes, seconds };
};

// Helper function to calculate day countdown (if the booking is on a different day)
const getDayCountdown = (targetDate: Date) => {
  const currentTime = new Date();
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const diffInMs = targetDate.getTime() - currentTime.getTime();

  const days = Math.ceil(diffInMs / oneDayInMs); // Round up to count the number of days left

  return { days };
};

const BookingSection = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [countdowns, setCountdowns] = useState<Record<string, any>>({});
  console.log(countdowns);


  // Filter upcoming bookings
  useEffect(() => {
    const currentTime = new Date();

    const filteredBookings = bookingData.filter((booking) => {
      const [year, month, day] = booking.date.split("-").map(Number);
      const bookingStartTime = new Date(
        year,
        month - 1,
        day,
        Math.floor(booking.startTime),
        (booking.startTime % 1) * 60
      );

      return bookingStartTime > currentTime; // Filter upcoming bookings
    });

    setUpcomingBookings(filteredBookings);
  }, []);

  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdowns: Record<string, any> = {};
      upcomingBookings.forEach((booking) => {
        const [year, month, day] = booking.date.split("-").map(Number);
        const bookingStartTime = new Date(
          year,
          month - 1,
          day,
          Math.floor(booking.startTime),
          (booking.startTime % 1) * 60
        );

        const bookingDateOnly = new Date(year, month - 1, day, 0, 0, 0); // Compare by date only

        if (bookingDateOnly.getTime() === new Date().setHours(0, 0, 0, 0)) {
          // Booking is today, show time countdown
          newCountdowns[booking._id] = { type: "time", ...getCountdown(bookingStartTime) };
        } else {
          // Booking is on a different day, show day countdown
          newCountdowns[booking._id] = { type: "day", ...getDayCountdown(bookingDateOnly) };
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [upcomingBookings]);

  return (
    <div>
      <h2>Upcoming Bookings</h2>
      {upcomingBookings.length === 0 ? (
        <p>No upcoming bookings.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcomingBookings.map((booking) => (
            <Card className="w-full max-w-md mx-auto" key={booking._id}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-lg font-medium">{booking.serviceName}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-lg">
                    {convertTo12Hour(booking.startTime)} to {convertTo12Hour(booking.endTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-lg">{booking.date}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Time Remaining:</h3>
                  {countdowns[booking._id] && countdowns[booking._id].type === "time" ? (
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-primary text-primary-foreground rounded-md p-2">
                        <span className="text-2xl font-bold">{countdowns[booking._id].hours}</span>
                        <p className="text-xs uppercase">Hours</p>
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-md p-2">
                        <span className="text-2xl font-bold">{countdowns[booking._id].minutes}</span>
                        <p className="text-xs uppercase">Minutes</p>
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-md p-2">
                        <span className="text-2xl font-bold">{countdowns[booking._id].seconds}</span>
                        <p className="text-xs uppercase">Seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary text-primary-foreground rounded-md p-2 text-center">
                      <span className="text-2xl font-bold">{countdowns[booking._id]?.days}</span>
                      <p className="text-xs uppercase">Days</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingSection;
