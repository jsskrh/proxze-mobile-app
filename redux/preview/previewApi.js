import { apiSlice } from "../api/apiSlice";

export const previewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    previewTask: builder.query({
      query: (id) => ({
        url: `/api/preview/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePreviewTaskQuery } = previewApi;
