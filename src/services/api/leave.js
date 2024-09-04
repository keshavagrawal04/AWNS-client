import service from "..";

const leaveApi = service.injectEndpoints({
  endpoints: builder => ({
    applyLeave: builder.mutation({
      query: data => ({
        url: "leave/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leave"],
    }),
    getLeaves: builder.query({
      query: () => `leave/view`,
      providesTags: ["Leave"],
    }),
  }),
});

export const {useApplyLeaveMutation, useGetLeavesQuery} = leaveApi;
