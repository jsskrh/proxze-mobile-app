import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getBanks = createAsyncThunk(
  "settings/get-banks",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
        },
      };
      const { data } = await axios.get(
        `https://api.paystack.co/bank?country=nigeria`,
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

export const resolveAccountNumber = createAsyncThunk(
  "settings/resolve-account-number",
  async ({ accountNumber, bankCode }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
      };
      const { data } = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
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

export const getBillingAlgorithm = createAsyncThunk(
  "settings/get-billing-algorithm",
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
        `https://${backendURL}/api/settings/billing-algorithm`,
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
    const userToken = await AsyncStorage.getItem("userToken");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `https://${backendURL}/api/settings/billing-algorithm`,
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
