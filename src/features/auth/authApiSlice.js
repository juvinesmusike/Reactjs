import { apiSlice } from 'src/app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'Auth/Login',
        method: 'POST',
        // mode: 'no-cors',
        // credentials: true,
        body: { ...credentials },
      }),
    }),
    refreshtoken: builder.mutation({
      query: (token) => ({
        url: 'Auth/refreshToken',
        method: 'POST',
        body: token,
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshtokenMutation } = authApiSlice
