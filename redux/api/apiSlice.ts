import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: backendURL,
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    // const userToken = await AsyncStorage.getItem("userToken");
    const token = getState().auth.userToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
