// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Import the RootState to access auth state
import { tagProviders } from "./tagTypes.ts";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://car-washing-backend-fxvk.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState; // Access the entire Redux state
      const token = state.auth.token; // Get the token from the auth slice

      // If we have a token, include it in the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: tagProviders,
});

export default baseApi;
