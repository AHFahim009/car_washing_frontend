import { useCreateBookingMutation } from "@/redux/api/endpoints/booking.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { resetBookingState } from "@/redux/slices/booking.slice";

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [status, setStatus] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false); // State for payment processing
  const [createBooking, { isLoading, isError }] =
    useCreateBookingMutation();
  const dispatch = useAppDispatch();
  const bookingData = useAppSelector((state) => state.booking.booking);

  useEffect(() => {
    const fetchBookingData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const paymentStatus = queryParams.get("status");
      const tranId = queryParams.get("tran_id");
      const paymentAmount = queryParams.get("amount");

      setStatus(paymentStatus);
      setTransactionId(tranId);
      setAmount(paymentAmount);

      if (paymentStatus === "Successful") {
        setIsPaymentProcessing(true); // Show "Processing" message

        try {
          const res = await createBooking(bookingData);

          if (res.data) {
            dispatch(resetBookingState());
            setIsPaymentProcessing(false); // Hide processing message
            navigate("/"); // Navigate to the home page after success
          } else {
            setIsPaymentProcessing(false);
          }
        } catch (error) {
          console.error("Failed to create booking:", error);
          setIsPaymentProcessing(false); // Hide processing message on failure
        }
      }

    };

    fetchBookingData();
  }, [location, createBooking, bookingData, dispatch, navigate]);



  return (
    <div>
      {isPaymentProcessing && <p>Processing your booking...</p>}

      {isError && (
        <>
          <p>
            Your payment was successful, but there was an issue creating your
            booking. Please try again later or <Link className="underline" to="/">Go to home</Link>
          </p>
        </>
      )}

      {status === "failed" && !isLoading && (
        <p>Payment failed. Please try again.</p>
      )}

      {status === "canceled" && !isLoading && <p>Payment was canceled.</p>}

      {status === "unclear" && !isLoading && (
        <p>Payment status is unclear. Please contact support.</p>
      )}
    </div>
  );
};

export default PaymentCallback;
