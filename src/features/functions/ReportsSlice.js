import { apiSlice } from 'src/app/api/apiSlice'

export const ReportsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    soa: build.query({
      query: () => 'Reports/SOA',
    }),
    accountsetup: build.query({
      query: () => 'Uploadexcel/SetupAccount',
    }),
    journals: build.query({
      query: () => 'Reports/reportSoa',
    }),
  }),
})

export const { useSoaQuery, useAccountsetupQuery, useJournalsQuery } = ReportsSlice
