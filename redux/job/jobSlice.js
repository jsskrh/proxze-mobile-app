import { createSlice } from "@reduxjs/toolkit";
import {
  // acceptOffer,
  // rejectOffer,
  // approveRejectRequest,
  // completeTask,
  // confirmTask,
  // getTaskpool,
  // getOngoingTasks,
  getJobs,
  // getPendingRequests,
  getJob,
  // getTaskHistory,
  // makeOffer,
  createJob,
  // startTask,
  // uploadAttachment,
  // makeRequestPayment,
  // startLive,
} from "./jobActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  jobs: [],
  job: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.jobs = [];
      state.job = null;
    },
    resetJobState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // create job
    [createJob.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [createJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get jobs
    [getJobs.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getJobs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.success = true;
      state.jobs = payload.data;
    },
    [getJobs.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get job
    [getJob.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.success = true;
      state.job = payload.data;
    },
    [getJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // // get pending requests
    // [getPendingRequests.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getPendingRequests.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.newRequests = payload.data;
    // },
    // [getPendingRequests.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // approve or reject request
    // [approveRejectRequest.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [approveRejectRequest.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [approveRejectRequest.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // make request payment
    // [makeRequestPayment.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [makeRequestPayment.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   console.log(payload.data);
    //   state.task = payload.data;
    // },
    // [makeRequestPayment.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // get ongoing tasks
    // [getOngoingTasks.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getOngoingTasks.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.ongoingTasks = payload.data;
    // },
    // [getOngoingTasks.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // get task history
    // [getTaskHistory.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getTaskHistory.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.taskHistory = payload.data;
    // },
    // [getTaskHistory.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // get taskpool
    // [getTaskpool.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getTaskpool.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.taskpool = payload.data;
    // },
    // [getTaskpool.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // make offer
    // [makeOffer.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [makeOffer.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [makeOffer.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // accept offer
    // [acceptOffer.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [acceptOffer.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [acceptOffer.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // reject offer
    // [rejectOffer.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [rejectOffer.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [rejectOffer.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // start task
    // [startTask.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [startTask.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [startTask.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // upload attachment
    // [uploadAttachment.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [uploadAttachment.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.uploadSuccess = true;
    //   state.task = payload.data;
    // },
    // [uploadAttachment.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // complete task
    // [completeTask.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [completeTask.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [completeTask.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // confirm task
    // [confirmTask.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [confirmTask.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [confirmTask.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // start live
    // [startLive.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [startLive.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.task = payload.data;
    // },
    // [startLive.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

export default jobSlice.reducer;
export const { clearJobState, resetJobState } = jobSlice.actions;
