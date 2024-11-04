import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import {
  deactivateAccount,
  resendToken,
  sendToken,
  updatePassword,
  updatePaymentInfo,
  updateUserInfo,
  verifyEmail,
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

  extraReducers: (builder) => {
    // verify email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // resend token
    builder
      .addCase(resendToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resendToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // send token
    builder
      .addCase(sendToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // update basic info
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.updateFunction = payload.updateFunction;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // update payment info
    builder
      .addCase(updatePaymentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePaymentInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePaymentInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // update password info
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // deactivate user
    builder
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deactivateAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deactivateAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUserState } = userSlice.actions;
