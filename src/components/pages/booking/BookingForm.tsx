import { Button } from "@/components/ui/button";
import { CustomForm } from "@/components/customForm/CustomForm";
import CustomInput from "@/components/customForm/CustomInput";
import { FieldValues } from "react-hook-form";
import axios from "axios";

import { BookingValidation } from "@/validation/booking.validation";
import CustomSelect from "@/components/customForm/CustomSelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBookingData, Booking } from "@/redux/slices/booking.slice";

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.credentials);

  // collect logged user info
  const userCredentials = {
    userId: user.userId,
    userName: user.name,
    userEmail: user.email,
  };

  // get selected service details from redux:
  const selectedServiceByRedux = useAppSelector(
    (state) => state.booking.selectedService
  );

  // main event:
  const handleBookingForm = async (data: FieldValues) => {
    if (!selectedServiceByRedux) {
      return;
    }
    //  booking schema:
    const bookingData = {
      ...data,
      slot: selectedServiceByRedux.selectedSlot,
      service: selectedServiceByRedux.serviceId,
      customer: userCredentials.userId,
    };

    //  store booking schema in redux store:
    dispatch(addBookingData(bookingData as Booking));
    try {
      console.log("hi i am hitting")
      const response = await axios.post(
        "http://localhost:8000/api/payment/finalize",
        // payment credentials request body
        {
          amount: selectedServiceByRedux.price,
          customerName: userCredentials.userName,
          customerEmail: userCredentials.userEmail,
        }
      );

      if (response.data.success) {
        window.location.replace(response.data.data.redirectUrl);
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  return (
    <>
      <CustomForm
        onSubmit={handleBookingForm}
        schema={BookingValidation.BookingSchema}
      >
        <CustomInput
          label="Vehicle Brand"
          placeholder="Enter your vehicle brand name"
          name="vehicleBrand"
          type="text"
        />
        <CustomSelect name="vehicleType" />
        <CustomInput
          label=" Vehicle Model"
          placeholder="Enter your  vehicle model"
          name="vehicleModel"
          type="text"
        />
        <CustomInput
          label="ManufacturingYear"
          placeholder="Manufacturing year"
          name="manufacturingYear"
          type="number"
        />
        <CustomInput
          label="RegistrationPlate"
          placeholder="registration Plate"
          name="registrationPlate"
          type="text"
        />
        <Button type="submit" className="w-full">
          Pay Now
        </Button>
      </CustomForm>
    </>
  );
};
export default BookingForm;
