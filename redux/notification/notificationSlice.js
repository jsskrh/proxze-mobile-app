import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNotifications,
  setNotificationRead,
  setNotificationsSeen,
} from "./notificationActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  notifications: { all: [], newNotifications: [], newCount: null },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.notifications = { all: [], newNotifications: [], newCount: null };
    },

    setNotifications: (state, { payload }) => {
      state.notifications.newNotifications = payload.data.notifications;
      state.notifications.newCount = payload.data.count;
    },
  },

  extraReducers: {
    // get all notifications
    [getAllNotifications.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getAllNotifications.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.notifications.all = payload.data;
    },
    [getAllNotifications.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set notifications seen
    [setNotificationsSeen.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [setNotificationsSeen.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [setNotificationsSeen.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set notifications read
    // [setNotificationRead.pending]: (state) => {
    //   // state.loading = true;
    //   state.error = null;
    //   state.success = false;
    // },
    [setNotificationRead.fulfilled]: (state, { payload }) => {
      // state.loading = false;
      // state.success = true;
      state.notifications.all.find(
        (notification) => notification.id === payload.data
      ).read = true;
    },
    [setNotificationRead.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default notificationSlice.reducer;
export const { clearNotificationState, setNotifications } =
  notificationSlice.actions;
