import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            //default is 60 seconds
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice