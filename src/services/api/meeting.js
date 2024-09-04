import service from "..";

const meetingApi = service.injectEndpoints({
  endpoints: builder => ({
    addMeeting: builder.mutation({
      query: data => ({
        url: "meeting/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),
    updateMeeting: builder.mutation({
      query: ({id, data}) => ({
        url: `meeting/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),
    deleteMeeting: builder.mutation({
      query: id => ({
        url: `meeting/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
    getMeeting: builder.query({
      query: id => `meeting/view/${id}`,
      providesTags: ["Meeting"],
    }),
    getMeetings: builder.query({
      query: () => `meeting/view`,
      providesTags: ["Meeting"],
    }),
  }),
});

export const {
  useAddMeetingMutation,
  useUpdateMeetingMutation,
  useGetMeetingQuery,
  useGetMeetingsQuery,
  useDeleteMeetingMutation,
} = meetingApi;
