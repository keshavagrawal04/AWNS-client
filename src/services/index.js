import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.105.147:8000/api/",
  prepareHeaders: async headers => {
    const userData = await AsyncStorage.getItem("user");
    const data = JSON.parse(userData);
    if (data?.tokens) {
      headers.set("authorization", `Bearer ${data?.tokens?.access}`);
    }
    return headers;
  },
});

const service = createApi({
  reducerPath: "service",
  baseQuery,
  tagTypes: ["User", "Meeting", "Leave"],
  endpoints: builder => ({}),
});

export default service;
