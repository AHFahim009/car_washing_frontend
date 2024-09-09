/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useCallback, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "@/redux/api/endpoints/serviceManagement.api";
import { useGetAvailableSlotsQuery } from "@/redux/api/endpoints/serviceSlot.api";
import { convertTo12HourFormat } from "@/helpers/convertTo12HourFormat";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addSelectedService } from "@/redux/slices/booking.slice";
import {
  AvailableSlotSkeleton,
  ServiceSkeleton,
} from "@/components/homePageSkeleton/ServiceDetailsSkeleton";
import { toast } from "sonner";

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    slotId: string | null;
    slotTime: string | null;
  }>({
    slotId: null,
    slotTime: null,
  });
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const userToken = useAppSelector((state) => state.auth.token);
  // Format selectedDate as YYYY-MM-DD
  const queryDate = selectedDate
    ? selectedDate.toLocaleDateString("en-CA")
    : "";

  // Fetch service data
  const {
    data: singleService,
    isError: IsServiceError,
    isLoading: isServiceLoading,
  } = useGetServiceByIdQuery(serviceId as string);
  if (IsServiceError) {
    navigate("/");
  }
  // Fetch available slots data
  const { data: selectedServicesSlot, isLoading: isSlotLoading } =
    useGetAvailableSlotsQuery(
      { serviceId, date: queryDate },
      { skip: !queryDate } // Skip the query if queryDate is not available
    );
  if (IsServiceError) {
    navigate("/");
  }

  // Memoize available time slots
  const availableTimeSlots = useMemo(() => {
    return (
      selectedServicesSlot?.data
        .filter((slot) => slot.isBooked !== "canceled")
        .map((slot) => ({
          slotId: slot._id,
          time: `${convertTo12HourFormat(
            slot.startTime
          )} - ${convertTo12HourFormat(slot.endTime)}`,
        })) || []
    );
  }, [selectedServicesSlot]);

  // Memoize booked time slots
  const bookedTimeSlots = useMemo(() => {
    return (
      selectedServicesSlot?.data
        .filter((slot) => slot.isBooked === "booked")
        .map(
          (slot) =>
            `${convertTo12HourFormat(slot.startTime)} - ${convertTo12HourFormat(
              slot.endTime
            )}`
        ) || []
    );
  }, [selectedServicesSlot]);

  const handleBooking = useCallback(() => {
    if (!userToken) {
      toast.error("you have to login first");
      return;
    }
    if (!selectedDate || !selectedTimeSlot.slotTime) {
      return;
    }
    dispatch(
      addSelectedService({
        name: singleService!.data.name,
        description: singleService!.data.description,
        duration: singleService!.data.duration,
        price: singleService!.data.price,
        selectedSlot: selectedTimeSlot.slotId!,
        date: selectedDate!.toISOString().split("T")[0],
        time: selectedTimeSlot!.slotTime,
        serviceId: serviceId!,
      })
    );
    navigate("/booking");
  }, [
    selectedDate,
    selectedTimeSlot,
    singleService,
    serviceId,
    navigate,
    dispatch,
    userToken,
  ]);

  const handleSlotSelection = useCallback((timeSlot: any) => {
    setSelectedTimeSlot({
      slotId: timeSlot.slotId,
      slotTime: timeSlot.time,
    });
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 pt-24 pb-8 ">
      <div className="grid md:grid-cols-2 md:items-center  gap-8">
        {isServiceLoading ? (
          <ServiceSkeleton />
        ) : (
          <div className="flex flex-col items-center  md:block">
            <h1 className="text-3xl font-bold mb-4">
              {singleService?.data.name}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-[400px] px-4 md:px-0">
              {singleService?.data.description}
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-bold">
                ${singleService?.data.price}
              </span>
              <span className="text-muted-foreground">
                {singleService?.data.duration} minutes
              </span>
            </div>
            <Calendar
              mode="single"
              onSelect={setSelectedDate}
              className="p-0 [&_td]:w-10 [&_td]:h-10 [&_th]:w-10 [&_[name=day]]:w-10 [&_[name=day]]:h-10 [&>div]:space-x-0 [&>div]:gap-6"
              selected={selectedDate}
            />
          </div>
        )}
        <div className="flex flex-col items-center md:block">
          <h2 className="text-2xl font-bold mb-4">Available Time Slots</h2>
          {isSlotLoading ? (
            <AvailableSlotSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((timeSlot) => {
                  const takeFirstTime = timeSlot.time.split("-")[0];
                  return (
                    <Button
                      key={timeSlot.slotId}
                      variant={
                        bookedTimeSlots.includes(timeSlot.time)
                          ? "outline"
                          : "default"
                      }
                      onClick={() => handleSlotSelection(timeSlot)}
                      disabled={bookedTimeSlots.includes(timeSlot.time)}
                      className={
                        bookedTimeSlots.includes(timeSlot.time)
                          ? "text-muted-foreground"
                          : ""
                      }
                    >
                      {takeFirstTime}
                    </Button>
                  );
                })
              ) : (
                <div className="col-span-3">
                  No slots available on this date
                </div>
              )}
            </div>
          )}

          {selectedTimeSlot.slotTime && (
            <div className="mt-8">
              <p className="text-muted-foreground mb-2">
                You have selected: {selectedTimeSlot.slotTime}
              </p>
              <Button onClick={handleBooking} size="lg" className="w-full">
                Book This Service
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
