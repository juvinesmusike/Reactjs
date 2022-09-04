import { apiSlice } from "src/app/api/apiSlice";

export const UploadSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        upload:builder.mutation({
            query:formData =>({
                url:'Uploadexcel/Upload',
                method:'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                body:{...formData},
            })
        }),
    }) 

})

export const {
    useUploadMutation
} = UploadSlice