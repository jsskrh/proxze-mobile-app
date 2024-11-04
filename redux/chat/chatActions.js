import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const getAllChats = createAsyncThunk(
  "chats/get-all",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(`/api/chat`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/create",
  async ({ taskId, message, proxze }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("testing");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/chat/create/${taskId}`,
        { taskId, message, proxze },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getChat = createAsyncThunk(
  "chats/get",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/chat/view/${credentials.chatId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/send",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/chat/view/${credentials.chatId}`,
        credentials,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setChatsSeen = createAsyncThunk(
  "chats/set-seen",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/chat/update/seen`,
        credentials,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setChatRead = createAsyncThunk(
  "chats/set-read",
  async ({ chat }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/chat/update/read/${chat}`,
        { chat },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
