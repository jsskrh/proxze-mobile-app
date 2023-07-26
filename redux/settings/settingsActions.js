import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/axios";

export const getBillingAlgorithm = createAsyncThunk(
  "settings/get-billing-algorithm",
  async (credentials, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `/api/settings/billing-algorithm`,
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

export const updateBillingAlgorithm = createAsyncThunk(
  "settings/update-billing-algorithm",
  async ({ updateFunction, ...update }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/settings/billing-algorithm`,
        update,
        config
      );
      data.updateFunction = updateFunction;
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
