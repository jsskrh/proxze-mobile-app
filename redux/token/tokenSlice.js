import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  pushToken: null,
};

const pushTokenSlice = createSlice({
  name: "pushToken",
  initialState,
  reducers: {
    setPushToken: (state, { payload }) => {
      state.pushToken = payload;
    },

    clearPushTokenState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.pushToken = null;
    },
  },

  extraReducers: {},
});

export default pushTokenSlice.reducer;
export const { clearPushTokenState, setPushToken } = pushTokenSlice.actions;
