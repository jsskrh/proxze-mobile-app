import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import {
  deactivateAccount,
  updatePassword,
  updatePaymentInfo,
  updateUserInfo,
} from "./userActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  updateFunction: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.updateFunction = null;
    },
  },

  extraReducers: {
    // update basic info
    [updateUserInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.updateFunction = payload.updateFunction;
    },
    [updateUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update payment info
    [updatePaymentInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updatePaymentInfo.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [updatePaymentInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update password info
    [updatePassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updatePassword.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // deactivate user
    [deactivateAccount.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [deactivateAccount.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deactivateAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
export const { clearUserState } = userSlice.actions;
