import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials , logOut } from '../../features/auth/authSlice'



const baseQuery = fetchBaseQuery({
    baseUrl:'https://localhost:7033/',
    credentials:'include',
    prepareHeaders:(headers ,{ getState }) =>{
        const localtoken = localStorage.getItem("user") 
        const token = localtoken != null ? JSON.parse(localtoken).token : null
        
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
        

    }
})



const baseQueryWithReauth = async(args , api , extraOptions) =>{

    let result = await baseQuery(args, api , extraOptions)

    console.log(result)
    if(result?.error?.status === 401){
        // console.log('sending refresh token')
        //  const refreshResult = await baseQuery('Auth/refreshToken' , api , extraOptions)
        //   // const refreshResult = await baseQuery('api/Auth/refreshToken' , api , extraOptions)
        // console.log(refreshResult)

        // if(refreshResult?.data){
        //     const username = api.getState().auth.username

        //     api.dispatch(setCredentials({...refreshResult.data, username}))

        //     result = await baseQuery(args , api , extraOptions)
        // }else{
            api.dispatch(logOut())
      //  }
    }
    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})