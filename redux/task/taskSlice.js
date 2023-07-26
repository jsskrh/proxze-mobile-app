import { createSlice } from "@reduxjs/toolkit";
import {
  acceptOffer,
  approveRejectRequest,
  completeTask,
  confirmTask,
  getTaskpool,
  getOngoingTasks,
  getPendingRequests,
  getTask,
  getTaskHistory,
  makeOffer,
  makeRequest,
  startTask,
  uploadAttachment,
  makeRequestPayment,
  startLive,
} from "./taskActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  uploadSuccess: false,
  tasks: [],
  taskpool: [],
  ongoingTasks: [],
  taskHistory: [],
  newRequests: [],
  task: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.uploadSuccess = false;
      state.task = null;
      state.tasks = [];
      state.taskpool = [];
      state.ongoingTasks = [];
      state.taskHistory = [];
      state.newRequests = [];
    },
    resetTaskState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // make request
    [makeRequest.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [makeRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [makeRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get task
    [getTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.success = true;
      state.task = payload.data;
    },
    [getTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get pending requests
    [getPendingRequests.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPendingRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.newRequests = payload.data;
    },
    [getPendingRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // approve or reject request
    [approveRejectRequest.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [approveRejectRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [approveRejectRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // make request payment
    [makeRequestPayment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [makeRequestPayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log(payload.data);
      state.task = payload.data;
    },
    [makeRequestPayment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get ongoing tasks
    [getOngoingTasks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getOngoingTasks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ongoingTasks = payload.data;
    },
    [getOngoingTasks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get task history
    [getTaskHistory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTaskHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.taskHistory = payload.data;
    },
    [getTaskHistory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get taskpool
    [getTaskpool.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTaskpool.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.taskpool = payload.data;
    },
    [getTaskpool.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // make offer
    [makeOffer.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [makeOffer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [makeOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // accept offer
    [acceptOffer.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [acceptOffer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [acceptOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // start task
    [startTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [startTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [startTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // upload attachment
    [uploadAttachment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [uploadAttachment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.uploadSuccess = true;
      state.task = payload.data;
    },
    [uploadAttachment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // complete task
    [completeTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [completeTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [completeTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // confirm task
    [confirmTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [confirmTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [confirmTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // start live
    [startLive.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [startLive.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.task = payload.data;
    },
    [startLive.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default taskSlice.reducer;
export const { clearTaskState, resetTaskState } = taskSlice.actions;
