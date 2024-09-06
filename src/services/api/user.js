import service from "..";

const userApi = service.injectEndpoints({
  endpoints: builder => ({
    updateProfileImage: builder.mutation({
      query: profileImage => ({
        url: `user/profile-image-update`,
        method: `PATCH`,
        body: profileImage,
      }),
      invalidatesTags: [`User`],
    }),
    updateUser: builder.mutation({
      query: userData => ({
        url: `user/update`,
        method: `PATCH`,
        body: userData,
      }),
      invalidatesTags: [`User`],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `user/delete/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: [`User`],
    }),
    getUserInfo: builder.query({
      query: () => `user/view`,
      providesTags: [`User`],
    }),
    getEmployees: builder.query({
      query: status => `user/employee/view/?status=${status}`,
      providesTags: [`User`],
    }),
    getUserById: builder.query({
      query: id => `user/view/${id}`,
      providesTags: [`User`],
    }),
    approveAnEmployee: builder.query({
      query: id => `user/employee/approve/${id}`,
      providesTags: [`User`],
    }),
  }),
});

export const {
  useUpdateProfileImageMutation,
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useGetEmployeesQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useApproveAnEmployeeQuery,
} = userApi;
