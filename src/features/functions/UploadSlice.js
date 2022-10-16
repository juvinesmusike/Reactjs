import { apiSlice } from 'src/app/api/apiSlice'

export const UploadSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (formData) => ({
        url: 'Uploadexcel/Upload',
        method: 'POST',
        body: formData,
      }),
    }),
    updateaccount: builder.mutation({
      query: ({ number, ...data }) => ({
        url: `Uploadexcel/updateaccount/${number}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useUploadMutation, useUpdateaccountMutation } = UploadSlice
