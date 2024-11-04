import { createSlice } from "@reduxjs/toolkit";
import {
  getBanks,
  getBillingAlgorithm,
  updateBillingAlgorithm,
} from "./settingsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  billingAlgorithm: null,
  updateFunction: null,
  banks: [],
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
      state.banks = [];
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

  extraReducers: (builder) => {
    // get banks
    builder
      .addCase(getBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBanks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const transformedBanks = payload.data.map((item) => ({
          id: item._id,
          name: item.name,
          code: item.code,
        }));
        Promise.all(transformedBanks).then((state.banks = transformedBanks));
      })
      .addCase(getBanks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get billing algorithm
    builder
      .addCase(getBillingAlgorithm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBillingAlgorithm.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.billingAlgorithm = payload.data;
      })
      .addCase(getBillingAlgorithm.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // update billing algorithm
    builder
      .addCase(updateBillingAlgorithm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBillingAlgorithm.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.billingAlgorithm = payload.data;
        state.updateFunction = payload.updateFunction;
      })
      .addCase(updateBillingAlgorithm.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default settingsSlice.reducer;
export const { clearSettingsState, resetSettingsSuccessState } =
  settingsSlice.actions;
