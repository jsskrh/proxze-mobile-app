import { createSlice } from "@reduxjs/toolkit";
import { getAllTransactions } from "./transactionActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.transactions = [];
    },
  },
  extraReducers: {
    // get all transactions
    [getAllTransactions.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getAllTransactions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.transactions = payload.data;
    },
    [getAllTransactions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default transactionSlice.reducer;
export const { clearTransactionState } = transactionSlice.actions;
