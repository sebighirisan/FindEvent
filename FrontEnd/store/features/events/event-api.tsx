import { Login, Signup } from '@/model/auth.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'asffsa'}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Login) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userInfo: Signup) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = eventApi;