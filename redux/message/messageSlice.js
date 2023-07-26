import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMessages,
  setMessageRead,
  setMessagesSeen,
} from "./messageActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  messages: { all: [], newMessages: [], newCount: null },
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessageState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.messages = { all: [], newMessages: [], newCount: null };
    },

    setMessages: (state, { payload }) => {
      state.messages.newMessages = payload.data.messages;
      state.messages.newCount = payload.data.count;
    },
  },

  extraReducers: {
    // get all messages
    [getAllMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getAllMessages.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.messages.all = payload.data;
    },
    [getAllMessages.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set messages seen
    [setMessagesSeen.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [setMessagesSeen.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [setMessagesSeen.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set messages read
    // [setMessageRead.pending]: (state) => {
    //   // state.loading = true;
    //   state.error = null;
    //   state.success = false;
    // },
    [setMessageRead.fulfilled]: (state, { payload }) => {
      // state.loading = false;
      // state.success = true;
      state.messages.all.find(
        (message) => message.id === payload.data
      ).read = true;
    },
    [setMessageRead.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default messageSlice.reducer;
export const { clearMessageState, setMessages } = messageSlice.actions;
