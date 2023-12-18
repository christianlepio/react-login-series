//fetchBaseQuery handles baseUrl for the data
//createApi lets us to create apiSlice that will serve as backend code
//createApi is used to implement rtk query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//actions from authSlice
import { setCredentials, logOut } from '../../features/auth/authSlice'

//define base query
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500', //url used by the backend (node js)
    credentials: 'include', //to also send back the http only cookies from frontend to backend
    //attach headers to baseQuery
    //will receive headers and destructured getState
    prepareHeaders: (headers, { getState }) => {
        //get token from getState auth token
        const token = getState().auth.token 
        if (token) {
            //if there's a token then set the headers
            //backend is expecting to receive 'authorization' string weather it's upper/lower case
            //also send the accessToken string that starts with 'Bearer'
            headers.set('authorization', `Bearer ${token}`)
        }
        //return headers that will send to the backend
        return headers
    }
})

//wrap baseQuery here so if it fails then we can request new access token again using refresh token (not expired)
//this function will required to receive a standard params args, api, extraOptions
const baseQueryWithReAuth = async (args, api, extraOptions) => {
    // define the result
    let result = await baseQuery(args, api, extraOptions)

    //if result has error and its status code is 403 (forbidden)
    if (result?.error?.originalStatus === 403) {
        console.log('Sending refresh token!...')
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log('refreshResult: ',refreshResult)

        //if there is refreshResult data
        if (refreshResult?.data) {
            //get user from getState() auth user of api parameter
            const user = api.getState().auth.user
            //store the new token by calling action setCredentials
            // refreshResult.data holds accessToken value
            //dispatch allows you to use or call actions
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            //retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            //if status code is not 403 (forbidden) then logout
            //dispatch allows you to use or call actions
            api.dispatch(logOut())
        }
    }

    return result
}

//crate apiSlice using createApi
export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth, //this will return the value of result variable
    endpoints: builder => ({}) //endpoints here is empty because we are going to extend this or inject endpoints from other slice
})