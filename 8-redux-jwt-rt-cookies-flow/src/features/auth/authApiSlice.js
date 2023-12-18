//extended slice
import { apiSlice } from "../../app/api/apiSlice";

//inject this enpoints to apiSlice
export const authApiSlice = apiSlice.injectEndpoints({
    //define endpoints
    endpoints: builder => ({
        //defined method to login user 
        //builder.mutation is for applying changes to cached data
        login: builder.mutation({
            //query accepts credentials params
            query: credentials => ({
                url: '/auth', //required backend url to login
                method: 'POST', //POST method is to submit login request
                body: { ...credentials } //this will send to the backend
            })
        }), 
    })
})

//RTK query automatically creates custom hooks for methods in extended enpoints above
//these custom hooks can be used by the components
export const { 
    useLoginMutation //generated from login mutation method
} = authApiSlice