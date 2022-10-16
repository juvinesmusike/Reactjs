import { apiSlice } from "src/app/api/apiSlice";

export const UploadSetupAccount = apiSlice.injectEndpoints({
    endpoints:builder =>({
        uploadsetupaccount:builder.mutation({
            query:formData =>({
                url:'Uploadexcel/UploadSetup',
                method:'POST',
                body:formData,
            })
        }),
    }) 

})

export const {
    useUploadsetupaccountMutation
} = UploadSetupAccount