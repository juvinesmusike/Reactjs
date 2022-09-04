import { apiSlice } from "src/app/api/apiSlice";

export const ViewSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        getview:builder.query({
            query:() => ('WeatherForecast')
            
        }),
    })

})

export const {
    useGetviewQuery
} = ViewSlice