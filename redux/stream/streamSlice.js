import { createSlice } from "@reduxjs/toolkit";
import { createLive, updateStream } from "./streamActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  uploadSuccess: false,
  stream: null,
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    clearStreamState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.uploadSuccess = false;
      state.stream = null;
    },

    resetSuccessState: (state) => {
      state.uploadSuccess = false;
    },
  },

  extraReducers: {
    // create live
    [createLive.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [createLive.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.stream = payload.data;
    },
    [createLive.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update stream
    [updateStream.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updateStream.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.stream = payload.data;
    },
    [updateStream.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default streamSlice.reducer;
export const { clearStreamState, resetSuccessState } = streamSlice.actions;
