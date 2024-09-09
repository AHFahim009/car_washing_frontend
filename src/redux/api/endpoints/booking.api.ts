import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Signup
    createBooking: builder.mutation({
      query: (bookingPayload) => ({
        url: "/bookings",
        method: "POST",
        body: bookingPayload,
      }),
      invalidatesTags: [tagTypes.Booking, tagTypes.Slot],
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.Booking],
    }),
    myBooking: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.Booking],
    }),
  }),
});

export const { useCreateBookingMutation, useGetAllBookingQuery, useMyBookingQuery } = bookingApi;
