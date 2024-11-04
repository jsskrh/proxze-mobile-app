import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../utils/axios";

export const createOrg = createAsyncThunk(
  "org/create",
  async (data, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      console.log(data);
      await axiosInstance.post(`/api/organization`, data, config);
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

export const orgRegister = createAsyncThunk(
  "org/register-member",
  async (body, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/organization/orgs/${body.orgId}/members/accept`,
        body,
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

export const orgLogin = createAsyncThunk(
  "org/login-member",
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
        `/api/organization/orgs/${body.orgId}/login`,
        body,
        config
      );
      // localStorage.setItem("orgToken", data.data.orgToken);
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

export const getOrg = createAsyncThunk(
  "organization/get-organization",
  async ({ orgId }, { rejectWithValue }) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/organization/orgs/${orgId}`,
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

export const addMember = createAsyncThunk(
  "organization/add-member",
  async (data, { rejectWithValue }) => {
    // const orgToken = localStorage.getItem("orgToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${orgToken}`,
        },
      };
      console.log(orgToken);
      await axiosInstance.put(
        `/api/organization/orgs/${data.orgId}/members`,
        data,
        config
      );
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

// export const getJob = createAsyncThunk(
//   "job/get-job",
//   async ({ orgId, jobId }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.get(
//         `/api/organization/${orgId}/task/${jobId}`,
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

// export const acceptJob = createAsyncThunk(
//   "job/accept-job",
//   async ({ orgId, jobId }, { rejectWithValue }) => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axiosInstance.put(
//         `/api/organization/${orgId}/task/${jobId}/accept`,
//         { orgId, jobId },
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
