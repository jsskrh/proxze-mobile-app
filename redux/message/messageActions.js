import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/axios";

export const getAllMessages = createAsyncThunk(
  "messages/get-all",
  async (credentials, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/message`, config);
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

export const setMessagesSeen = createAsyncThunk(
  "messages/set-seen",
  async (credentials, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/message/update/seen`,
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

export const setMessageRead = createAsyncThunk(
  "messages/set-read",
  async ({ message }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/message/update/read/${message}`,
        { message },
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
