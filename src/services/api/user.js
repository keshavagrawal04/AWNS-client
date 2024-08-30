import service from "..";

const userApi = service.injectEndpoints({
  endpoints: builder => ({
    updateProfileImage: builder.mutation({
      query: profileImage => ({
        url: "user/profile-image-update",
        method: "PATCH",
        body: profileImage,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: userData => ({
        url: "user/update",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getUserInfo: builder.query({
      query: () => `user/view`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateProfileImageMutation,
  useGetUserInfoQuery,
  useUpdateUserMutation,
} = userApi;
