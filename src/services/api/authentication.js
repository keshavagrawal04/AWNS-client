import service from "..";

const authenticationApi = service.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: userData => ({
        url: "user/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: userData => ({
        url: `user/login`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {useSignupMutation, useLoginMutation} = authenticationApi;
