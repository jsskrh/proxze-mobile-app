import { createSlice } from "@reduxjs/toolkit";
import {
  getAllChats,
  createChat,
  sendChat,
  getChat,
  setChatRead,
  setChatsSeen,
} from "./chatActions";

const initialState = {
  loading: false,
  chatLoading: false,
  error: null,
  success: false,
  getChatSuccess: false,
  textSuccess: false,
  submitSuccess: false,
  chats: { all: [], newChats: [], newCount: null },
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatState: (state) => {
      state.loading = false;
      state.chatLoading = false;
      state.error = null;
      state.success = false;
      state.textSuccess = false;
      state.getChatSuccess = false;
      state.submitSuccess = false;
      state.chats = { all: [], newChats: [], newCount: null };
      state.chat = [];
    },

    setChats: (state, { payload }) => {
      state.chats.newChats = payload.data.chats;
      state.chats.newCount = payload.data.count;
    },

    addText: (state, { payload }) => {
      state.chat = [...state.chat, payload];
    },
  },

  extraReducers: {
    // get all chats
    [getAllChats.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getAllChats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.chats.all = payload.data;
    },
    [getAllChats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // create chat
    [createChat.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createChat.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.submitSuccess = true;
      state.chat = payload.data;
    },
    [createChat.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get chat
    [getChat.pending]: (state) => {
      state.getChatLoading = true;
      state.error = null;
      state.getChatSuccess = false;
    },
    [getChat.fulfilled]: (state, { payload }) => {
      state.getChatLoading = false;
      state.getChatSuccess = true;
      state.chat = payload.data;
    },
    [getChat.rejected]: (state, { payload }) => {
      state.getChatLoading = false;
      state.error = payload;
    },

    // send chat
    [sendChat.pending]: (state) => {
      state.textSuccess = false;
      state.loading = true;
      state.error = null;
    },
    [sendChat.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.textSuccess = true;
      state.chat = [...state.chat, payload.data];
    },
    [sendChat.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set chats seen
    [setChatsSeen.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [setChatsSeen.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [setChatsSeen.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // set chat read
    // [setChatRead.pending]: (state) => {
    //   // state.loading = true;
    //   state.error = null;
    //   state.success = false;
    // },
    // [setChatRead.fulfilled]: (state, { payload }) => {
    //   // state.loading = false;
    //   // state.success = true;
    //   state.chats.all.find(
    //     (chat) => message.id === payload.data
    //   ).read = true;
    // },
    [setChatRead.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default chatSlice.reducer;
export const { clearChatState, setChats, addText } = chatSlice.actions;
