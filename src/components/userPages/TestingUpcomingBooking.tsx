/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useMyBookingQuery } from "@/redux/api/endpoints/booking.api";
import {
  calculateTimeDifference,
  convertTo12Hour,
} from "@/helpers/upcomingbookingHelpers";
import PastBooking from "./PastBookingTable";
import UserBookingSkeleton from "./UserBookingSkeleton";

const TestingUpcomingBooking = () => {
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const {
    data: bookedData,
    isSuccess,
    isLoading,
    isError,
  } = useMyBookingQuery("");

  useEffect(() => {
    if (isSuccess && bookedData?.data) {
      const currentTime = new Date();
      const bookingData = bookedData.data;

      // Separate upcoming and past bookings
      const upcoming = [] as any[];
      const past = [] as any[];

      bookingData.forEach((booking: any) => {
        if (booking?.slot?.startTime && booking?.slot?.date) {
          const [startHour, startMinute] = booking.slot.startTime
            .split(":")
            .map(Number);
          const [year, month, day] = booking.slot.date.split("-").map(Number);
          const bookingStartTime = new Date(
            year,
            month - 1,
            day,
            startHour,
            startMinute
          );

          if (bookingStartTime > currentTime) {
            upcoming.push(booking); // Add to upcoming bookings
          } else {
            past.push(booking); // Add to past bookings
          }
        }
      });

      // Update the state with filtered bookings
      setUpcomingBookings(upcoming);
      setPastBookings(past);
    }
  }, [isSuccess, bookedData]); // Depend on isSuccess and bookedData

  useEffect(() => {
    if (upcomingBookings.length > 0) {
      const intervalId = setInterval(() => {
        const newCountdowns: Record<string, string> = {};

        upcomingBookings.forEach((booking) => {
          newCountdowns[booking._id] = calculateTimeDifference(booking);
        });
        setCountdowns(newCountdowns);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [upcomingBookings]); // Recalculate countdowns when upcomingBookings change

  if (isError) {
    return <div>fetching problem....</div>;
  }

  // loading state
  if (isLoading) {
    return <UserBookingSkeleton />;
  }

  return (
    <section className="w-full">
      {upcomingBookings.length === 0 ? (
        <p className="text-lg mt-8 text-center font-semibold text-gray-500">
          No upcoming booking.
        </p>
      ) : (
        <>
          <h1 className="text-2xl font-bold my-5">Upcoming Bookings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {upcomingBookings.map((bookingData) => (
              <Card key={bookingData._id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {bookingData.service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {convertTo12Hour(bookingData.slot.startTime)} to{" "}
                        {convertTo12Hour(bookingData.slot.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{bookingData.slot.date}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {countdowns[bookingData._id] || "Calculating..."}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <PastBooking pastBooking={pastBookings} />
    </section>
  );
};

export default TestingUpcomingBooking;
