import { createSlice } from "@reduxjs/toolkit";
// import { clearMessageState } from "../notification/notificationSlice";
import { clearNotificationState } from "../notification/notificationSlice";
import { clearTaskState } from "../task/taskSlice";
import { clearTicketState } from "../ticket/ticketSlice";
import { clearTransactionState } from "../transaction/transactionSlice";
import { clearChatState } from "../chat/chatSlice";
import {
  deactivateAccount,
  updatePaymentInfo,
  updateUserInfo,
} from "../user/userActions";
import { clearUserState } from "../user/userSlice";
import { registerUser, userLogin, getUser } from "./authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// initialize userToken from local storage
// let userToken = null;

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

// _retrieveData();

// console.log(userToken);

const initialState = {
  loading: false,
  loadingLocation: true,
  userInfo: null,
  userToken: null,
  pushToken: null,
  error: null,
  success: false,
  registerSuccess: false,
  currentLocation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("userToken");
      AsyncStorage.removeItem("userToken");
      state.loading = false;
      state.loadingLocation = true;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.currentLocation = null;
      state.success = false;
      state.registerSuccess = false;
      // clearUserState();
      clearTaskState();
      clearNotificationState();
      clearChatState();
      // clearNotifications();
      clearTransactionState();
      // clearTicketState();
      // clearNotificationState();
      // clearTransactionState();
    },

    setUserToken: (state, { payload }) => {
      state.userToken = payload;
    },

    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },

    setPushToken: (state, { payload }) => {
      state.pushToken = payload;
    },

    setCurrentLocation: (state, { payload }) => {
      state.currentLocation = payload;
      state.loadingLocation = false;
    },

    setLocationError: (state, { payload }) => {
      state.error = payload;
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
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
      state.registerSuccess = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get user
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data;
      state.userToken = payload.data.userToken;
      state.success = true;
    },
    [getUser.rejected]: (state, { payload }) => {
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
    [deactivateAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      clearUserState();
    },
  },
});

export default authSlice.reducer;
export const {
  logout,
  setLoading,
  setPushToken,
  setCurrentLocation,
  setLocationError,
  setUserInfo,
  setUserToken,
} = authSlice.actions;
