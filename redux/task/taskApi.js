import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaskpool: builder.query({
      query: () => ({
        url: `/task/taskpool`,
        method: "GET",
      }),
    }),
    getOngoingTasks: builder.query({
      query: () => ({
        url: `/task/ongoing`,
        method: "GET",
      }),
    }),
    makeOffer: builder.mutation({
      query: ({ task, coverLetter, timestamp }) => ({
        url: `/api/task/view/${task}/proxze/make-offer`,
        method: "PUT",
        body: { coverLetter, timestamp },
      }),
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/task/view/${id}`,
        method: "GET",
      }),
    }),
    acceptOffer: builder.mutation({
      query: ({ task, proxze, timestamp }) => ({
        url: `/api/task/view/${task}/principal/accept-offer`,
        method: "PUT",
        body: { proxze, timestamp },
      }),
    }),
    acceptTask: builder.mutation({
      query: ({ task, proxze, timestamp }) => ({
        url: `/api/task/view/${task}/proxze/accept-task`,
        method: "PUT",
        body: { proxze, timestamp },
      }),
    }),
    rejectOffer: builder.mutation({
      query: ({ task, proxze, timestamp }) => ({
        url: `/api/task/view/${task}/principal/reject-offer`,
        method: "PUT",
        body: { proxze, timestamp },
      }),
    }),
    makePayment: builder.mutation({
      query: (id) => ({
        url: `/api/transaction/deposit/task/${id}`,
        method: "PUT",
        body: { task: id },
      }),
    }),
    startTask: builder.mutation({
      query: ({ task, timestamp }) => ({
        url: `/api/task/view/${task}/admin/start-task`,
        method: "PUT",
        body: { task, timestamp },
      }),
    }),
    completeTask: builder.mutation({
      query: ({ task, timestamp }) => ({
        url: `/api/task/view/${task}/proxze/complete-task`,
        method: "PUT",
        body: { timestamp },
      }),
    }),
    confirmTask: builder.mutation({
      query: ({ task, timestamp }) => ({
        url: `/api/transaction/transfer/task/${task}`,
        method: "PUT",
        body: { timestamp },
      }),
    }),
    acceptRejectCompletion: builder.mutation({
      query: ({ task, type }) => ({
        url: `/api/task/view/${task}/admin/approve/${type}`,
        method: "PUT",
        body: { task, type },
      }),
    }),
  }),
});

export const {
  useMakeOfferMutation,
  useGetTaskQuery,
  useAcceptOfferMutation,
  useRejectOfferMutation,
  useMakePaymentMutation,
  useStartTaskMutation,
  useCompleteTaskMutation,
  useConfirmTaskMutation,
  useAcceptRejectCompletionMutation,
  useAcceptTaskMutation,
  useGetTaskpoolQuery,
  useGetOngoingTasksQuery,
} = taskApi;
