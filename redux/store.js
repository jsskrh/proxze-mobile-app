import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import adminReducer from "./admin/adminSlice";
import taskReducer from "./task/taskSlice";
// import jobReducer from "./job/jobSlice";
// import organizationReducer from "./organization/organizationSlice";
import chatReducer from "./chat/chatSlice";
import notificationReducer from "./notification/notificationSlice";
import helpReducer from "./help/helpSlice";
import ticketReducer from "./ticket/ticketSlice";
import reviewReducer from "./review/reviewSlice";
// import streamReducer from "./stream/streamSlice";
import transactionReducer from "./transaction/transactionSlice";
import settingsReducer from "./settings/settingsSlice";
// import notificationsReducer from "./notifications/notificationsSlice";
import { apiSlice } from "./api/apiSlice";
// import { chatsApi } from "./services/chatsService";
// import { chatsApi } from "./services/chatsService";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    ticket: ticketReducer,
    // job: jobReducer,
    // organization: organizationReducer,
    // ticket: ticketReducer,
    admin: adminReducer,
    review: reviewReducer,
    // stream: streamReducer,
    notification: notificationReducer,
    chat: chatReducer,
    help: helpReducer,
    transaction: transactionReducer,
    settings: settingsReducer,
    // notifications: notificationsReducer,
    // [chatsApi.reducerPath]: chatsApi.reducer,
    // [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
  //     messagesApi.middleware,
  //     chatsApi.middleware
});
