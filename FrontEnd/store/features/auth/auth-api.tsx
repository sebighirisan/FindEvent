import { Login, Signup } from "@/model/auth.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Login) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        responseHandler: 'text'
      }),
    }),
    register: builder.mutation({
      query: (userInfo: Signup) => ({
        url: "auth/signup",
        method: "POST",
        body: userInfo,
        responseHandler: "text"
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
