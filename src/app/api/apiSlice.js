import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://localhost:7033/',
  baseUrl: 'https://codeit-synergyportal.com/',
  // credentials:'include',
  prepareHeaders: (headers, { getState }) => {
    const localtoken = localStorage.getItem('user')
    const token = localtoken != null ? JSON.parse(localtoken).token : null
    // console.log(token)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  // console.log(result?.error)

  if (result?.error?.originalStatus === 500) {
    api.dispatch(logOut())
  } else {
    // console.log(result)
    if (result?.error?.status === 401) {
      const localtoken = localStorage.getItem('user')
      const refreshToken = localtoken != null ? JSON.parse(localtoken).refreshToken : null
      const token = localtoken != null ? JSON.parse(localtoken).token : null
      const username = localtoken != null ? JSON.parse(localtoken).username : null

      // console.log(refreshToken)

      const refreshResult = await baseQuery(
        {
          url: 'Auth/refreshToken',
          method: 'POST',
          body: { token, refreshToken },
        },
        api,
        extraOptions,
      )

      console.log(refreshResult)

      if (refreshResult?.data) {
        console.log(refreshResult?.data)
        api.dispatch(setCredentials({ ...refreshResult.data, username }))

        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logOut())
      }
    }
    return result
  }
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
