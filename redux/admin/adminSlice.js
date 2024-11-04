import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import {
  getDashboard,
  getTasks,
  getHoldings,
  getUser,
  getUsers,
} from "./adminActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  dashboard: { stats: { users: null, tasks: 0 } },
  users: {
    data: { proxzeCount: null, principalCount: null, staffCount: null },
    count: null,
    users: [],
    hasNextPage: false,
  },
  user: null,
  tasks: {
    data: { taskpoolCount: null, activeCount: null },
    count: null,
    tasks: [],
    hasNextPage: false,
  },
  holdings: {
    data: { transactionCount: null, balance: null, ledgerBalance: null },
    count: null,
    transactions: [],
    hasNextPage: false,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },

    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.dashboard = { stats: { users: null, tasks: 0 } };
      state.users = {
        data: { proxzeCount: null, principalCount: null, staffCount: null },
        count: null,
        users: [],
        hasNextPage: false,
      };
      state.user = null;
      state.tasks = {
        data: { taskpoolCount: null, activeCount: null },
        count: null,
        tasks: [],
        hasNextPage: false,
      };
      state.holdings = {
        data: { transactionCount: null, balance: null, ledgerBalance: null },
        count: null,
        transactions: [],
        hasNextPage: false,
      };
    },
  },

  extraReducers: (builder) => {
    // get dashboard
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDashboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.dashboard = payload.data;
      })
      .addCase(getDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get users
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.users = payload.data;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get user
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.data;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get tasks
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.tasks = payload.data;
      })
      .addCase(getTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get holdings
    builder
      .addCase(getHoldings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getHoldings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.holdings = payload.data;
      })
      .addCase(getHoldings.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default adminSlice.reducer;
export const { clearAdminState, resetAdminState } = adminSlice.actions;
