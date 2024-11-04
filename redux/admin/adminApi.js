import { apiSlice } from "../api/apiSlice";
import { getHoldings } from "./adminActions";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHoldings: builder.query({
      query: ({ search, page, type, purpose, sort, date }) => ({
        url: `/api/admin/transactions?search=${search}&page=${page}&type=${type}&purpose=${purpose}&startDate=${date?.startDate}&endDate=${date?.endDate}&sortBy=${sort.sortBy}&orderBy=${sort.orderBy}`,
      }),
    }),
    bulkVerifyNin: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bulk/users/verify-nin`,
        method: "PATCH",
        // body: data,
      }),
    }),
    bulkVerifyEmail: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bulk/users/verify-email`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUsersWithUnverifiedNin: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bulk/users/deactivate-nin`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetHoldingsQuery,
  useBulkVerifyEmailMutation,
  useBulkVerifyNinMutation,
  useDeleteUsersWithUnverifiedNinMutation,
} = adminApi;
