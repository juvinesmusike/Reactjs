import { apiSlice } from 'src/app/api/apiSlice'

export const AnnexSetupSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    maingroup: build.query({
      query: () => 'AnnexSetup/mainlist',
    }),
    getmaingroup: build.mutation({
      query: ({ ShipCode }) => ({
        url: `AnnexSetup/getmainlist/${ShipCode}`,
        method: 'GET',
      }),
    }),
    savemain: build.mutation({
      query: (data) => ({
        url: 'AnnexSetup/MainGroup',
        method: 'POST',
        body: { ...data },
      }),
    }),
    updatemain: build.mutation({
      query: ({ Code, ...data }) => ({
        url: `AnnexSetup/mainEdit/${Code}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletemain: build.mutation({
      query: ({ Code }) => ({
        url: `AnnexSetup/mainDelete/${Code}`,
        method: 'DELETE',
      }),
    }),
    annextype: build.query({
      query: () => 'AnnexSetup/annextypelist',
    }),
    getannextype: build.mutation({
      query: ({ ShipCode }) => ({
        url: `AnnexSetup/getannextypelist/${ShipCode}`,
        method: 'GET',
      }),
    }),
    saveannextype: build.mutation({
      query: (data) => ({
        url: 'AnnexSetup/addannextype',
        method: 'POST',
        body: { ...data },
      }),
    }),
    updateannextype: build.mutation({
      query: ({ id, ...data }) => ({
        url: `AnnexSetup/annextype/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteannextype: build.mutation({
      query: ({ id }) => ({
        url: `AnnexSetup/annextypedelete/${id}`,
        method: 'DELETE',
      }),
    }),
    annexsubkey: build.query({
      query: () => 'AnnexSetup/annexsubkeylist',
    }),
    getannexsubkey: build.mutation({
      query: ({ ShipCode }) => ({
        url: `AnnexSetup/getnnexsubkeylist/${ShipCode}`,
        method: 'GET',
      }),
    }),
    saveannexsub: build.mutation({
      query: (data) => ({
        url: 'AnnexSetup/addannexsub',
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
})

export const {
  useMaingroupQuery,
  useGetmaingroupMutation,
  useSavemainMutation,
  useAnnextypeQuery,
  useSaveannextypeMutation,
  useUpdatemainMutation,
  useDeletemainMutation,
  useAnnexsubkeyQuery,
  useSaveannexsubMutation,
  useUpdateannextypeMutation,
  useDeleteannextypeMutation,
  useGetannextypeMutation,
  useGetannexsubkeyMutation,
} = AnnexSetupSlice
