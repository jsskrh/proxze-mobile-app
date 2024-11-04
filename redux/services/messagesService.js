import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getNewMessages: builder.query({
      query: () => ({
        url: "api/message/unseen",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewMessagesQuery } = messagesApi;
