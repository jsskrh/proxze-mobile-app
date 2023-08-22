import { createSlice } from "@reduxjs/toolkit";
import { clearMessageState } from "../notification/notificationSlice";
// import { clearNotifications } from "../notifications/notificationsSlice";
import { clearTaskState } from "../task/taskSlice";
import { clearTicketState } from "../ticket/ticketSlice";
import { clearTransactionState } from "../transaction/transactionSlice";
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
  loading: true,
  waiting: false,
  loadingLocation: true,
  userInfo: null,
  userToken: null,
  pushToken: null,
  error: null,
  success: false,
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
      state.waiting = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.currentLocation = null;
      // clearUserState();
      clearTaskState();
      // clearNotifications();
      // clearTransactionState();
      // clearTicketState();
      // clearNotificationState();
      // clearTransactionState();
    },

    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },

    setUserToken: (state, { payload }) => {
      state.userToken = payload;
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
      state.waiting = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.waiting = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.waiting = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.waiting = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.waiting = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.waiting = false;
      state.error = payload;
    },

    // get user
    [getUser.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data;
      state.userToken = payload.userToken;
      state.userInfo.userToken = payload.userToken;
      state.success = true; // registration successful
    },
    [getUser.rejected]: (state, { payload }) => {
      state.waiting = false;
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
  setCredentials,
  testLogin,
  testLogout,
  testRegister,
  setLoading,
  setPushToken,
  setUserToken,
  setCurrentLocation,
  setLocationError,
} = authSlice.actions;
