import { apiSlice } from 'src/app/api/apiSlice'

export const StatementOfAccount = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    shipnetreport: builder.mutation({
      query: ({ shipcode }) => ({
        url: `Reports/ShipSoaReport/${shipcode}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useShipnetreportMutation } = StatementOfAccount
