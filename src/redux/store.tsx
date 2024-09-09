// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./slices/booking.slice";
import baseApi from "./api/baseApi";
import authSlice from "./slices/authSlice"; // Import authSlice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage

// Persist configuration for authSlice
const authPersistConfig = {
  key: "auth", // Unique key for auth slice
  storage,
  whitelist: ["token", "credentials"], // Only persist these fields
};

// Persist configuration for bookingSlice (already present)
const bookingPersistConfig = {
  key: "booking",
  storage,
  whitelist: ["booking", "selectedService"],
};

// Wrap the reducers with persistReducer
const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);
const persistedBookingReducer = persistReducer(
  bookingPersistConfig,
  bookingSlice.reducer
);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [bookingSlice.name]: persistedBookingReducer, // Persisted booking slice
    [authSlice.name]: persistedAuthReducer, // Persisted auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
