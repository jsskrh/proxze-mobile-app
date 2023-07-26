import { createSlice } from "@reduxjs/toolkit";
import { createReview } from "./reviewActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  submitSuccess: false,
  // reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.submitSuccess = false;
      // state.reviews = [];
    },

    resetSuccessState: (state) => {
      state.submitSuccess = false;
    },
  },

  extraReducers: {
    // create review
    [createReview.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [createReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [createReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default reviewSlice.reducer;
export const { clearReviewState, resetSuccessState } = reviewSlice.actions;
