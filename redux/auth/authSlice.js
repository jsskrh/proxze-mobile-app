import { createSlice } from "@reduxjs/toolkit";
import { clearMessageState } from "../message/messageSlice";
import { clearNotifications } from "../notifications/notificationsSlice";
import { clearTaskState } from "../task/taskSlice";
import { clearTicketState } from "../ticket/ticketSlice";
import { clearTransactionState } from "../transaction/transactionSlice";
import {
  deactivateAccount,
  updatePaymentInfo,
  updateUserInfo,
} from "../user/userActions";
import { clearUserState } from "../user/userSlice";
import { registerUser, userLogin } from "./authActions";
import { AsyncStorage } from "react-native";

// initialize userToken from local storage
let userToken = null;

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("userToken");
//     if (value !== null) {
//       userToken = value;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const initialState = {
  loading: true,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      clearUserState();
      clearTaskState();
      clearNotifications();
      clearTransactionState();
      clearTicketState();
      clearMessageState();
      clearTransactionState();
    },

    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    testLogin: (state, { payload }) => {
      state.userToken = payload;
      state.loading = false;
    },
    testLogout: (state) => {
      state.userToken = null;
      state.loading = false;
    },
    testRegister: (state, { payload }) => {
      state.userToken = payload;
      state.loading = false;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update basic info
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      const { updateFunction, ...restPayload } = payload;
      state.userInfo = restPayload;
    },

    // update payment info
    [updatePaymentInfo.fulfilled]: (state, { payload }) => {
      state.userInfo.bank = payload.bank;
      state.userInfo.accountNumber = payload.accountNumber;
    },

    // deactivate user
    // [deactivateAccount.fulfilled]: (state, { payload }) => {
    //   // state.loading = false;
    //   // state.userInfo = null;
    //   // state.userToken = null;
    //   // state.error = null;
    //   // clearUserState();
    // },
  },
});

export default authSlice.reducer;
export const {
  logout,
  setCredentials,
  testLogin,
  testLogout,
  testRegister,
  setLoading,
} = authSlice.actions;
