import service from "..";

const attendanceApi = service.injectEndpoints({
  endpoints: builder => ({
    addAttendance: builder.mutation({
      query: data => ({
        url: "attendance/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useAddAttendanceMutation} = attendanceApi;
