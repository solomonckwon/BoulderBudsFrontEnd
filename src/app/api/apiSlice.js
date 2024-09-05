import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://boulderbuds-api.onrender.com/',
    // baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
    

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
            }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log some stuff here 

    let result = await baseQuery(args, api, extraOptions)
    
    if ( result?.error?.status === 403) {
        console.log('refresh token sending')

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        // Auth token refreshed 
        if(refreshResult?.data) { 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        } else { 
            if (refreshResult?.error?.status === 403) {
                // Refresh auth token expired
                refreshResult.error.data.message = "Login expired."
            }
            
            return refreshResult
        }
    }  

    // result is null if not valid login 
    return result
}

    

export const apiSlice = createApi ({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})