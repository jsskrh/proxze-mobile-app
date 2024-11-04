import { apiSlice } from "../api/apiSlice";

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserLocation: builder.mutation({
      query: (updatedLocation) => ({
        url: "api/user/location",
        method: "PUT",
        body: updatedLocation,
      }),
    }),
  }),
});

export const { useUpdateUserLocationMutation } = locationApi;
