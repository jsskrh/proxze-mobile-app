import { apiSlice } from "../api/apiSlice";

export const enterpriseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestOrg: builder.mutation({
      query: (data) => ({
        url: "/api/organization/requests",
        method: "POST",
        body: data,
      }),
    }),
    getOrgRequest: builder.query({
      query: () => "/api/organization/requests",
    }),
    getOrgRequests: builder.query({
      query: (status) => `/api/staff/orgs/requests?status=${status}`,
    }),
    processOrgRequest: builder.mutation({
      query: ({ reqId, event }) => ({
        url: `/api/staff/orgs/requests/${reqId}/${event}`,
        method: "PUT",
        body: { reqId, event },
      }),
    }),
    getOrgs: builder.query({
      query: () => "/api/organization/orgs",
    }),
  }),
});

export const {
  useRequestOrgMutation,
  useGetOrgRequestQuery,
  useGetOrgsQuery,
  useGetOrgRequestsQuery,
  useProcessOrgRequestMutation,
} = enterpriseApi;
