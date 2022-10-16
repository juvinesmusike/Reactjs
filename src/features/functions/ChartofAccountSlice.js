import { apiSlice } from 'src/app/api/apiSlice'

export const ChartofAccountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    voucher: builder.mutation({
      query: ({ vouchernum }) => ({
        url: `ChartofAccount/voucher/${vouchernum}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useVoucherMutation } = ChartofAccountSlice
