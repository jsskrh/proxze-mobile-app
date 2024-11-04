import { apiSlice } from "../api/apiSlice";

export const superApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProxze: builder.mutation({
      query: (data) => ({
        url: `/api/super/users`,
        method: "POST",
        body: data,
      }),
    }),
    addProxzeBulk: builder.mutation({
      query: (data) => ({
        url: `/api/super/users/bulk`,
        method: "POST",
        body: data,
      }),
    }),
    getProxzes: builder.query({
      query: ({ search, page, isVerified, state, lga, date, sort }) =>
        `/api/super/users?search=${search}&page=${page}&isVerified=${isVerified}&state=${state}&lga=${lga}&startDate=${date?.startDate}&endDate=${date?.endDate}&sortBy=${sort.sortBy}&orderBy=${sort.orderBy}`,
    }),
  }),
});

export const {
  useAddProxzeMutation,
  useGetProxzesQuery,
  useAddProxzeBulkMutation,
} = superApi;
