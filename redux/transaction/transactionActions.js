import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { axiosInstance } from "../../utils/axios";

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
