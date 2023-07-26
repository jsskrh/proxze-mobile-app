import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { axiosInstance } from "../../utils/axios";

export const makeRequest = createAsyncThunk(
  "task/create",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      await axios.post(`/api/task`, data, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPendingRequests = createAsyncThunk(
  "task/get-pending-requests",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/task/pending`, config);
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

export const getOngoingTasks = createAsyncThunk(
  "task/get-ongoing-tasks",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/task/ongoing`, config);
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

export const getTaskHistory = createAsyncThunk(
  "task/get-task-history",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/task/history`, config);
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

export const getTask = createAsyncThunk(
  "task/get-task",
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
        `/api/task/view/${credentials.id}`,
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

export const approveRejectRequest = createAsyncThunk(
  "task/approve-rejects",
  async ({ task, type }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/admin/approve/${type}`,
        { task, type },
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

export const makeRequestPayment = createAsyncThunk(
  "task/deposit",
  async ({ task }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/transaction/deposit/task/${task}`,
        { task },
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

export const getTaskpool = createAsyncThunk(
  "task/get-taskpool",
  async (data, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`/api/task/taskpool`, config);
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

export const makeOffer = createAsyncThunk(
  "task/make-offer",
  async ({ task, coverLetter, timestamp }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/proxzi/make-offer`,
        { coverLetter, timestamp },
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

export const acceptOffer = createAsyncThunk(
  "task/accept-offer",
  async ({ task, proxzi, timestamp }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/principal/accept-offer`,
        { proxzi, timestamp },
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

export const startTask = createAsyncThunk(
  "task/start-task",
  async ({ task, timestamp }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/admin/start-task`,
        { task, timestamp },
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

export const uploadAttachment = createAsyncThunk(
  "task/upload-attachment",
  async ({ task, url, timestamp, location }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/proxzi/upload`,
        { url, timestamp, location },
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

export const completeTask = createAsyncThunk(
  "task/complete-task",
  async ({ task, timestamp }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/proxzi/complete-task`,
        { timestamp },
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

export const confirmTask = createAsyncThunk(
  "task/confirm-task",
  async ({ task, timestamp }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        // `/api/task/view/${task}/principal/confirm-task`,
        `/api/transaction/transfer/task/${task}`,
        { timestamp },
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

export const updateLastViewed = createAsyncThunk(
  "task/last-viewed",
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
        `/api/task/view/${task}/principal/last-viewed`,
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

export const startLive = createAsyncThunk(
  "task/start-live",
  async ({ task }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/task/view/${task}/stream`,
        { type: true },
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
