//this slice is for login authentication features
//slice is a collection of reducer logic/actions for a single feature in the app
//createSlice to create a slice
import { createSlice } from '@reduxjs/toolkit'

//create auth slice and it has an object inside of it
const authSlice = createSlice({
    //objects
    name: 'auth', //this is required
    //initial state that holds value for user and token (accessToken)
    initialState: { user: null, token: null },
    //reducers contains all actions/functions for posts
    reducers: {
        //action to set value for user and token
        //this will going to receive state and action
        setCredentials: (state, action) => {
            //get the received user & accessToken from action's payload
            const { user, accessToken } = action.payload

            // set the value for user & token
            state.user = user
            state.token = accessToken
        }, 
        //action to logout and set the value of user & token to null
        logOut: (state, action) => {
            state.user = null 
            state.token = null
        }
    },
})

//export actions to use in other components
export const { setCredentials, logOut } = authSlice.actions

//export authSlice reducer that will be use in app/store.js list of reducer
export default authSlice.reducer

//this will be useful for useSelector, to manage easily in other components
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token