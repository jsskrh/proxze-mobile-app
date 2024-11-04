import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const chatsApi = createApi({
  reducerPath: "chatsApi",
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
    getNewChats: builder.query({
      query: () => ({
        url: "api/chat/unseen",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewChatsQuery } = chatsApi;
