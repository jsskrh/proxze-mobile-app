import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../utils/axios";

export const createJob = createAsyncThunk(
  "job/create",
  async (body, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/organization/orgs/${body.org}/jobs`,
        body,
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

// export const getPendingRequests = createAsyncThunk(
//   "task/get-pending-requests",
//   async (data, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.get(`/api/task/pending`, config);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const getOngoingTasks = createAsyncThunk(
//   "task/get-ongoing-tasks",
//   async (data, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.get(`/api/task/ongoing`, config);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const getJobs = createAsyncThunk(
  "job/get-jobs",
  async (body, { rejectWithValue }) => {
    // const orgToken = localStorage.getItem("orgToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${orgToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/organization/orgs/${body.org}/jobs`,
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

// export const getTaskHistory = createAsyncThunk(
//   "task/get-task-history",
//   async (data, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.get(`/api/task/history`, config);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const getJob = createAsyncThunk(
  "job/get-job",
  async ({ orgId, jobId }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/organization/orgs/${orgId}/jobs/${jobId}`,
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

export const acceptJob = createAsyncThunk(
  "job/accept-job",
  async ({ orgId, jobId, rate }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/organization/orgs/${orgId}/jobs/${jobId}/accept`,
        { rate },
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

// export const approveRejectRequest = createAsyncThunk(
//   "task/approve-rejects",
//   async ({ task, type }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/admin/approve/${type}`,
//         { task, type },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const makeRequestPayment = createAsyncThunk(
//   "task/deposit",
//   async ({ task }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/transaction/deposit/task/${task}`,
//         { task },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const getTaskpool = createAsyncThunk(
//   "task/get-taskpool",
//   async (data, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.get(`/api/task/taskpool`, config);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const makeOffer = createAsyncThunk(
//   "task/make-offer",
//   async ({ task, coverLetter, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/proxze/make-offer`,
//         { coverLetter, timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const acceptOffer = createAsyncThunk(
//   "task/accept-offer",
//   async ({ task, proxze, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/principal/accept-offer`,
//         { proxze, timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const rejectOffer = createAsyncThunk(
//   "task/reject-offer",
//   async ({ task, proxze, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/principal/reject-offer`,
//         { proxze, timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const startTask = createAsyncThunk(
//   "task/start-task",
//   async ({ task, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/admin/start-task`,
//         { task, timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const uploadAttachment = createAsyncThunk(
//   "task/upload-attachment",
//   async ({ task, url, timestamp, location }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/proxze/upload`,
//         { url, timestamp, location },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const completeTask = createAsyncThunk(
//   "task/complete-task",
//   async ({ task, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/proxze/complete-task`,
//         { timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const confirmTask = createAsyncThunk(
//   "task/confirm-task",
//   async ({ task, timestamp }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         // `/api/task/view/${task}/principal/confirm-task`,
//         `/api/transaction/transfer/task/${task}`,
//         { timestamp },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const updateLastViewed = createAsyncThunk(
//   "task/last-viewed",
//   async (credentials, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/principal/last-viewed`,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const startLive = createAsyncThunk(
//   "task/start-live",
//   async ({ task }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/task/view/${task}/stream`,
//         { type: true },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
