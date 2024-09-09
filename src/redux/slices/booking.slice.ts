import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// types.ts
export interface SelectedService {
  name: string;
  description: string;
  price: number;
  duration: number;
  selectedSlot: string;
  date: string;
  time: string;
  serviceId: string
}

export interface Booking {
  customer: string;
  service: string;
  slot: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

export interface BookingState {
  selectedService: SelectedService;
  booking: Booking;
}


export const initialState: BookingState = {
  selectedService: {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    selectedSlot: '',
    date: "",
    time: '',
    serviceId: ""
  },
  booking: {
    customer: '',
    service: '',
    slot: '',
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    manufacturingYear: 0,
    registrationPlate: '',
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addSelectedService(state, action: PayloadAction<SelectedService>) {
      state.selectedService = action.payload;
    },
    addBookingData(state, action: PayloadAction<Booking>) {
      state.booking = action.payload;
    },
    resetBookingState(state) {
      // Resetting the state to its initial values
      state.selectedService = initialState.selectedService;
      state.booking = initialState.booking;
    },
  },
});

export const { addSelectedService, addBookingData, resetBookingState } = bookingSlice.actions;
export default bookingSlice;
