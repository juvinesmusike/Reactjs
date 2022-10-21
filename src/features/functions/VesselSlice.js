import { apiSlice } from 'src/app/api/apiSlice'

export const VesselSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    vessellist: build.query({
      query: () => 'Vessel/vissellist',
    }),
    uploadvessel: build.mutation({
      query: (formData) => ({
        url: 'Vessel/UploadVessel',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const { useVessellistQuery, useUploadvesselMutation } = VesselSlice
