import { createSlice } from "@reduxjs/toolkit";
import {
  createTicket,
  getAllTickets,
  getHandlingTickets,
  getResolvedTickets,
  getUnassignedTickets,
  handleTicket,
  resolveTicket,
  sendResponse,
} from "./ticketActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  submitSuccess: false,
  tickets: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearTicketState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.submitSuccess = false;
      state.tickets = [];
    },

    resetSuccessState: (state) => {
      state.submitSuccess = false;
    },
  },

  extraReducers: {
    // create ticket
    [createTicket.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [createTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [createTicket.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get all tickets
    [getAllTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getAllTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.tickets = payload.data;
    },
    [getAllTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get resolved tickets
    [getResolvedTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getResolvedTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.tickets = payload.data;
    },
    [getResolvedTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get unassigned tickets
    [getUnassignedTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getUnassignedTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.tickets = payload.data;
    },
    [getUnassignedTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get handling tickets
    [getHandlingTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getHandlingTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.tickets = payload.data;
    },
    [getHandlingTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // handle ticket
    [handleTicket.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [handleTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.submitSuccess = true;
    },
    [handleTicket.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // respond to ticket
    [sendResponse.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [sendResponse.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.submitSuccess = true;
    },
    [sendResponse.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // resolve ticket
    [resolveTicket.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [resolveTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.submitSuccess = true;
    },
    [resolveTicket.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default ticketSlice.reducer;
export const { clearTicketState, resetSuccessState } = ticketSlice.actions;
