import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
type TAuthProps = {
  token: string;
  credentials: {
    userId: string;
    email: string;
    role: string;
    name: string;
    photo: string;
  };
};

// Define the initial state
const initialState: TAuthProps = {
  token: "",
  credentials: {
    userId: "",
    email: "",
    role: "",
    name: "",
    photo: "",
  },
};

// Create the Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add to user (store token and credentials)
    addToUser: (state, action: PayloadAction<TAuthProps>) => {
      state.token = action.payload.token;
      state.credentials = action.payload.credentials;
    },

    // Logout user (reset to initial state)
    logoutUser(state) {
      state.token = "";
      state.credentials = initialState.credentials;
    },
  },
});

// Export the actions
export const { addToUser, logoutUser } = authSlice.actions;

// Export the reducer
export default authSlice;
