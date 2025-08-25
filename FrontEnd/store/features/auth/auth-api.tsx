import { LoginCredentials, Signup } from "@/model/auth.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        responseHandler: "text",
      }),
    }),
    register: builder.mutation({
      query: (userInfo: Signup) => ({
        url: "signup",
        method: "POST",
        body: userInfo,
        responseHandler: "text",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
