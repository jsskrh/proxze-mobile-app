import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://proxze-backend-app.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      console.log("token", token);
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
