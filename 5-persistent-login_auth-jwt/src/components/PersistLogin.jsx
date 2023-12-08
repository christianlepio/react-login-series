//this component remain the user to logs in (if successfully logs in) when the browser reloads

import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    //get refresh function from useRefreshToken custom hook
    const refresh = useRefreshToken()
    //get auth state from useAuth custom hook
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                //get new accessToken
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        //get new access token if there is no access token in auth else set is loading to false
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {
                isLoading 
                    ? <p className="lead mb-4 text-center me-1">Loading...</p>
                    : <Outlet /> //these are the protected routes in AppRoutes components
            }
        </>
    )
}

export default PersistLogin