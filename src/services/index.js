import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.31.84:8000/api/",
  // ## Uncomment and modify if authentication is required
  // prepareHeaders: (headers) => {
  //   const token = localStorage.getItem('tokens');
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

const service = createApi({
  reducerPath: "service",
  baseQuery,
  endpoints: builder => ({}),
});

export default service;
