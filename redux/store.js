import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import taskReducer from "./task/taskSlice";
import chatReducer from "./chat/chatSlice";
import notificationReducer from "./notification/notificationSlice";
import ticketReducer from "./ticket/ticketSlice";
import reviewReducer from "./review/reviewSlice";
import streamReducer from "./stream/streamSlice";
import transactionReducer from "./transaction/transactionSlice";
import settingsReducer from "./settings/settingsSlice";
// import notificationsReducer from "./notifications/notificationsSlice";
import { authApi } from "./services/authService";
import { chatsApi } from "./services/chatsService";
// import { messagesApi } from "./services/messagesService";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    ticket: ticketReducer,
    review: reviewReducer,
    stream: streamReducer,
    notification: notificationReducer,
    chat: chatReducer,
    transaction: transactionReducer,
    settings: settingsReducer,
    // notifications: notificationsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    // [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      // messagesApi.middleware,
      chatsApi.middleware
    ),
});
