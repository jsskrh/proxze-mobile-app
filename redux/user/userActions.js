import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/axios";

export const updateUserInfo = createAsyncThunk(
  "user/user-info",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    const { updateFunction, ...credentials } = data;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/user/settings/user-info`,
        credentials,
        config
      );
      data.updateFunction = updateFunction;
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePaymentInfo = createAsyncThunk(
  "user/payment-info",
  async (
    { bank, oldAccountNumber, newAccountNumber, password },
    { rejectWithValue }
  ) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/user/settings/payment-info`,
        { bank, oldAccountNumber, newAccountNumber, password },
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/password",
  async ({ password, newPassword }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/user/settings/password`,
        { password, newPassword },
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "user/deactivate",
  async ({ password }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/user/settings/deactivate`,
        { password },
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserStateOnLogout = createAsyncThunk(
  "user/updateStateOnLogout",
  async (_, { dispatch }) => {
    dispatch(clearUserState()); // clear user state in userSlice
  }
);
