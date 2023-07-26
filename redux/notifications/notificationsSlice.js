import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      // const timer = setTimeout(() => {
      //   state.notifications.shift();
      // }, 6000);
      // return () => clearTimeout(timer);
    },
    removeNotification: (state) => {
      state.notifications.shift();
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export default notificationsSlice.reducer;
export const { addNotification, removeNotification, clearNotifications } =
  notificationsSlice.actions;
