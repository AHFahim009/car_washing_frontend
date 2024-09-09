// src/api/serviceManagementApi.ts
import { TGenericRes } from "@/types/globa.types";
import baseApi from "../baseApi";
import {
  TCreateService,
  TCreateServiceRes,
} from "@/types/interface/createService.interface";
import { tagTypes } from "../tagTypes";

export const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services
    getAllServices: builder.query<TGenericRes<TCreateServiceRes[]>, "">({
      query: () => ({
        url: "services",
        method: "GET",
      }),
      providesTags: [tagTypes.Service],
    }),

    // Get a single service by ID
    getServiceById: builder.query<TGenericRes<TCreateServiceRes>, string>({
      query: (id) => ({
        url: `services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.Service],
    }),

    // Create a new service
    createService: builder.mutation<
      TGenericRes<TCreateServiceRes>,
      TCreateService
    >({
      query: (payload) => ({
        url: "services",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.Service],
    }),

    // Update an existing service by ID
    updateService: builder.mutation<
      TGenericRes<TCreateServiceRes>,
      { id: string; data: Partial<TCreateService> }
    >({
      query: ({ id, data }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.Service],
    }),

    // Delete a service by ID
    deleteService: builder.mutation<TGenericRes<null>, string>({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Service],
    }),
  }),
  overrideExisting: false, // Optional, override existing endpoints if they already exist
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceManagementApi;
