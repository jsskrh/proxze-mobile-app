import { createSlice } from "@reduxjs/toolkit";
import { getBillingAlgorithm, updateBillingAlgorithm } from "./settingsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  billingAlgorithm: null,
  updateFunction: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettingsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.billingAlgorithm = null;
      state.updateFunction = null;
    },

    resetSettingsSuccessState: (state) => {
      state.success = false;
      state.updateFunction = null;
    },
    // setMessages: (state, { payload }) => {
    //   state.messages.newMessages = payload.data.messages;
    //   state.messages.newCount = payload.data.count;
    // },
  },

  extraReducers: {
    // get billing algorithm
    [getBillingAlgorithm.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getBillingAlgorithm.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.billingAlgorithm = payload.data;
    },
    [getBillingAlgorithm.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update billing algorithm
    [updateBillingAlgorithm.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updateBillingAlgorithm.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.billingAlgorithm = payload.data;
      state.updateFunction = payload.updateFunction;
    },
    [updateBillingAlgorithm.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default settingsSlice.reducer;
export const { clearSettingsState, resetSettingsSuccessState } =
  settingsSlice.actions;
