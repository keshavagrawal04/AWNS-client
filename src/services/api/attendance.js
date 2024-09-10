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
    getAttendance: builder.query({
      query: () => `attendance/employee/get`,
    }),
  }),
});

export const {useAddAttendanceMutation, useGetAttendanceQuery} = attendanceApi;
