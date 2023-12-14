//this component is to protect the routes

import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
//used to decode and get values of roles from the access token
import { jwtDecode } from 'jwt-decode'

const RequireAuth = ({ allowedRoles }) => {
    //custom hook to get auth state from context 
    const { auth } = useAuth()
    //initialize location history
    const location = useLocation()
    //decode the encrypted accesstoken using jwt decode
    const decoded = auth?.accessToken 
        ? jwtDecode(auth.accessToken)
        : undefined
    //get roles from decoded accesstoken
    const roles = decoded?.UserInfo?.roles || []

    console.log('user: ',auth?.user)

    return (
        //check if the prop allowedRoles is existing to the roles
        roles?.find(role => allowedRoles.includes(role))
            //if there is a roles that matches to the allowedRoles props then return outlet (child components / routes)
            ? <Outlet />
            //if there's no roles matches, check if there is a user in auth state logged in
            : auth?.user
                //navigate to unauthorized page
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                //if there is no user logged in then go to the login page
                //state is an extra attribute of Navigate
                //state={{ from: location }} - saves the location(url) history
                //replace attribute is for back button function to replace the login 
                //location(url) with the history/previous location(url)
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth