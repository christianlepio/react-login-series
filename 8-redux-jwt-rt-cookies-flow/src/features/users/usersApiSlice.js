//extended slice
import { apiSlice } from "../../app/api/apiSlice"

//inject this enpoints to apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
    //define endpoints
    endpoints: builder => ({
        //method to get all users from url+query
        //builder.query is for requesting data
        getUsers: builder.query({
            query: () => '/users', //required url to request record of users from backend
            //default is 60 seconds
            //this will save user's data for 5 secs in cache
            keepUnusedDataFor: 5,
        })
    })
})

//RTK query automatically creates custom hooks for methods in extended enpoints above
//these custom hooks can be used by the components
export const {
    useGetUsersQuery //custom hook generated from getUsers query method
} = usersApiSlice