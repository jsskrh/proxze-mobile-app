import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: null,
  success: false,
  locationItems: [],
  location: null,
  currentLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearLocationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.location = null;
      state.currentLocation = null;
    },

    setLocation: (state, { payload }) => {
      state.location = payload;
    },

    setCurrentLocation: (state, { payload }) => {
      state.currentLocation = payload;
      state.loading = false;
    },

    setLocationError: (state, { payload }) => {
      state.error = payload;
    },

    resetLocation: (state) => {
      state.location = null;
    },
  },

  extraReducers: {},
});

export default locationSlice.reducer;
export const {
  clearLocationState,
  setLocation,
  setCurrentLocation,
  setLocationError,
  resetLocation,
} = locationSlice.actions;
