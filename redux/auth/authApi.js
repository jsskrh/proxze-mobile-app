import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body,
      }),
    }),

    getUserDetails: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
    }),

    testMail: builder.mutation({
      query: (data) => ({
        url: "api/user/test-send-token",
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "api/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `api/user/reset-password/${token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useTestMailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
} = authApi;
