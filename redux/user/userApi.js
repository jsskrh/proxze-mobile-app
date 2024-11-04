import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBasicInfo: builder.mutation({
      query: (data) => ({
        url: "api/user/settings/basic-info",
        method: "PATCH",
        body: data,
      }),
    }),
    updateAddress: builder.mutation({
      query: (data) => ({
        url: "api/user/settings/address",
        method: "PATCH",
        body: data,
      }),
    }),
    registerSubProxze: builder.mutation({
      query: (data) => ({
        url: `api/user/register/sub/${data.token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateBasicInfoMutation,
  useUpdateAddressMutation,
  useRegisterSubProxzeMutation,
} = userApi;
