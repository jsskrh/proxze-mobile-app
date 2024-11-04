import { createSlice } from "@reduxjs/toolkit";
import {
  // acceptOffer,
  createOrg,
  // rejectOffer,
  // approveRejectRequest,
  // completeTask,
  // confirmTask,
  // getTaskpool,
  // getOngoingTasks,
  // getPendingRequests,
  // getOrganization,
  // getTaskHistory,
  // makeOffer,
  // createOrganization,
  getOrg,
  addMember,
  orgRegister,
  orgLogin,
  // startTask,
  // uploadAttachment,
  // makeRequestPayment,
  // startLive,
} from "./organizationActions";

// const orgToken = localStorage.getItem("orgToken")
//   ? localStorage.getItem("orgToken")
//   : null;

const initialState = {
  loading: false,
  error: null,
  success: false,
  orgReqs: [],
  orgs: [],
  org: null,
  orgToken,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("orgToken");
      state.loading = false;
      state.error = null;
      state.success = false;
      state.orgReqs = [];
      state.orgs = [];
      state.org = null;
      state.orgToken = null;
    },

    clearOrganizationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    resetOrganizationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    // get organization
    builder
      .addCase(getOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getOrg.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.org = payload.data;
      })
      .addCase(getOrg.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // register member
    builder
      .addCase(orgRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(orgRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(orgRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // login member
    builder
      .addCase(orgLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(orgLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.orgToken = payload.data.orgToken;
      })
      .addCase(orgLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    //   // create organization
    // [createOrg.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [createOrg.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.createSuccess = true;
    //   state.organizations = [...state.organization, payload.data];
    // },
    // [createOrg.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // get organization
    // [getOrganization.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getOrganization.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   // state.success = true;
    //   state.organization = payload.data;
    // },
    // [getOrganization.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // add member
    // [addMember.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [addMember.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   // state.success = true;
    //   state.organization = payload.data;
    // },
    // [addMember.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // // get organization
    // [getOrganization.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getOrganization.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   // state.success = true;
    //   state.organization = payload.data;
    // },
    // [getOrganization.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

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

export default organizationSlice.reducer;
export const { clearOrganizationState, resetOrganizationState } =
  organizationSlice.actions;
