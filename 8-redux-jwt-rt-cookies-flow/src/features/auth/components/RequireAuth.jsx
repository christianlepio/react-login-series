import { useLocation, Navigate, Outlet } from 'react-router-dom'
//useSelector here is to get global state variable from store
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../authSlice'

const RequireAuth = () => {
    //get access token
    const token = useSelector(selectCurrentToken)
    //define location
    const location = useLocation()

    return (
        token 
            ? <Outlet /> //if there is an access token then return outlet
            : <Navigate to='/login' state={{ from: location }} replace /> //navigate user to login page if there is no existing access token
    )
}

export default RequireAuth