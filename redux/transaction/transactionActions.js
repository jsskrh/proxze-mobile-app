import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { axiosInstance } from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = `https://proxze-backend-app.onrender.com`;

export const getEarnings = createAsyncThunk(
  "transactions/get-all",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `${baseURL}/api/transaction/earnings`,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "transactions/get-all",
  async (credentials, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/transaction`, config);
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
