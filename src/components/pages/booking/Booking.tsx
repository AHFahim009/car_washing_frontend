import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import BookingForm from "./BookingForm";
import { Link } from "react-router-dom";
import { useSelectedSlotStatusQuery } from "@/redux/api/endpoints/serviceSlot.api";
import { useEffect, useState } from "react";
import { resetBookingState } from "@/redux/slices/booking.slice";
import { toast } from "sonner";

export default function Booking() {
  const [slotCurrentStatus, setSlotCurrentStatus] = useState("");
  const { data: selectedSlotStatus } = useSelectedSlotStatusQuery(
    slotCurrentStatus || ""
  );
  const selectedService = useAppSelector(
    (state) => state.booking.selectedService
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setSlotCurrentStatus(selectedService.selectedSlot);

    // Ensure selectedSlotStatus exists and check for "booked" or "cancle"
    if (
      selectedSlotStatus &&
      (selectedSlotStatus.data === "booked" ||
        selectedSlotStatus.data === "canceled")
    ) {
      dispatch(resetBookingState());
      toast.warning("already slot booked");
    }
  }, [selectedSlotStatus, dispatch, selectedService]);

  return (
    <div className=" container mx-auto  grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 pt-24 pb-8  ">
      {!selectedService.selectedSlot ? (
        <div>
          <Link to={"/services"}>go to service page</Link>
        </div>
      ) : (
        <div className="bg-muted rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              <p className="text-muted-foreground">
                {selectedService.duration} min
              </p>
            </div>

            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
              ${selectedService.price}
            </div>
          </div>

          <p className="mb-2">{selectedService.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background rounded-xl p-4 border border-input">
              <p className="text-sm font-medium mb-2">Date</p>
              <p className="text-2xl font-bold">{selectedService.date}</p>
            </div>
            <div className="bg-background rounded-xl p-4 border border-input">
              <p className="text-sm font-medium mb-2">Time</p>
              <p className="text-2xl font-bold">{selectedService.time}</p>
            </div>
          </div>

          {/* User Info Section */}
          <div className="bg-background rounded-xl p-4 border border-input mt-4">
            <p className="text-sm font-medium mb-2">User Info</p>
            <h1 className="text-xl font-bold">Name: Fahim</h1>
            <p className="text-muted-foreground">Email: ahfba009@gmail.com</p>
          </div>
        </div>
      )}
      {/* form col */}
      <div className="bg-background rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
        <BookingForm />
      </div>
    </div>
  );
}
