// src/api/serviceManagementApi.ts
import { TGenericRes } from "@/types/globa.types";
import baseApi from "../baseApi";
import { TSlot, TSlotRes } from "@/types/interface/slot.interface";
import { tagTypes } from "../tagTypes";


export const serviceSlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new slots for a service
    createSlots: builder.mutation<TGenericRes<TSlotRes[]>, TSlot>({
      query: (newSlots) => ({
        url: "services/slots",
        method: "POST",
        body: newSlots,
      }),
      invalidatesTags: [tagTypes.Slot]

    }),

    // Get available slots
    getAvailableSlots: builder.query<TGenericRes<TSlotRes[]>, Record<string, unknown>>({
      query: (queryParams) => ({
        url: `slots/availability`,
        method: "GET",
        params: queryParams, // Directly pass the query parameters
      }),
      providesTags: [tagTypes.Slot]
    }),
    updateSlotStatus: builder.mutation<TGenericRes<null>, string>({
      query: (slotId) => ({
        url: `slots/${slotId}`,
        method: "PUT",

      }),
      invalidatesTags: [tagTypes.Slot]
    }),
    selectedSlotStatus: builder.query<TGenericRes<null>, string>({
      query: (slotId) => ({
        url: `slotStatus/${slotId}`,
        method: "GET",

      }),
      providesTags: [tagTypes.Slot]
    }),


  }),
  overrideExisting: false,
});

export const { useCreateSlotsMutation, useGetAvailableSlotsQuery, useUpdateSlotStatusMutation, useSelectedSlotStatusQuery } =
  serviceSlotApi;
