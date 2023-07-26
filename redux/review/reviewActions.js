import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/axios";

export const createReview = createAsyncThunk(
  "review/create",
  async ({ task, review, rating }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      await axios.post(`/api/review`, { task, review, rating }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
