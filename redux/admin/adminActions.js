import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const getDashboard = createAsyncThunk(
  "admin/dashboard",
  async (credentials, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(`/api/admin/dashboard`, config);
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

export const getUsers = createAsyncThunk(
  "admin/get-users",
  async (
    { search, page, userType, isVerified, state, lga, sort, date },
    { rejectWithValue }
  ) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/admin/users?search=${search}&page=${page}&userType=${userType}&isVerified=${isVerified}&state=${state}&lga=${lga}&startDate=${date?.startDate}&endDate=${date?.endDate}&sortBy=${sort.sortBy}&orderBy=${sort.orderBy}`,
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

export const getUser = createAsyncThunk(
  "admin/get-user",
  async ({ userId }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/admin/users/${userId}`,
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

export const updateUserInfo = createAsyncThunk(
  "user/user-info",
  async (data, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    const { updateFunction, ...credentials } = data;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/user/settings/user-info`,
        credentials,
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

export const resendToken = createAsyncThunk(
  "user/resend-token",
  async ({ email }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const data = await axiosInstance.post(
        `/api/user/resend-token`,
        { email },
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

export const sendToken = createAsyncThunk(
  "user/send-token",
  async ({ email, firstName }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/user/send-token`,
        { email, firstName },
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

export const updatePaymentInfo = createAsyncThunk(
  "user/payment-info",
  async (
    { bank, oldAccountNumber, accountNumber, password, bankCode, accountName },
    { rejectWithValue }
  ) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/user/settings/payment-info`,
        {
          bank,
          oldAccountNumber,
          accountNumber,
          password,
          bankCode,
          accountName,
        },
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
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
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
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
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

export const getTasks = createAsyncThunk(
  "admin/get-tasks",
  async ({ search, page, type, status, sort, date }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/admin/tasks?search=${search}&page=${page}&type=${type}&status=${status}&startDate=${date?.startDate}&endDate=${date?.endDate}&sortBy=${sort.sortBy}&orderBy=${sort.orderBy}`,
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

export const getHoldings = createAsyncThunk(
  "admin/get-holdings",
  async ({ search, page, type, purpose, sort, date }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/admin/transactions?search=${search}&page=${page}&type=${type}&purpose=${purpose}&startDate=${date?.startDate}&endDate=${date?.endDate}&sortBy=${sort.sortBy}&orderBy=${sort.orderBy}`,
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

export const getEarnings = createAsyncThunk(
  "user/earnings",
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
        `/api/transaction/earnings`,
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

export const updateUserStateOnLogout = createAsyncThunk(
  "user/updateStateOnLogout",
  async (_, { dispatch }) => {
    dispatch(clearUserState()); // clear user state in userSlice
  }
);
