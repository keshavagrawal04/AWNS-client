import service from "..";

const projectApi = service.injectEndpoints({
  endpoints: builder => ({
    addProject: builder.mutation({
      query: data => ({
        url: "project/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({id, data}) => ({
        url: `project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: id => ({
        url: `project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    getProject: builder.query({
      query: id => `project/view/${id}`,
      providesTags: ["Project"],
    }),
    getProjects: builder.query({
      query: () => `project/view`,
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
  useGetProjectsQuery,
  useDeleteProjectMutation,
} = projectApi;
