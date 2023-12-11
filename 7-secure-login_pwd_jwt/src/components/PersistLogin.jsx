//this component remain the user to logs in (if successfully logs in) when the browser reloads

import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage" //custom hook to set/get the value of input in localStorage

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    //get refresh function from useRefreshToken custom hook
    const refresh = useRefreshToken()
    //get auth state from useAuth custom hook
    const { auth } = useAuth()
    //get the value of persist from the local storage if there is, otherwise set the value to false
    //will return true or false 
    const [persist] = useLocalStorage('persist', false)

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                //get new accessToken
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                isMounted ? setIsLoading(false) : null
            }
        }

        //get new access token if there is no access token in auth else set is loading to false
        !auth?.accessToken ? verifyRefreshToken() : isMounted ? setIsLoading(false) : null

        //clean up function of useEffect
        return () => isMounted = false

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {
                !persist //if user do not trust the device then return the outlet without checking isLoading
                    ? <Outlet /> //these are the child protected routes in AppRoutes components
                    //isLoading here lets the app to process and get new accessToken to avoid going to login page when browser reloads
                    : isLoading 
                        ? <p className="lead mb-4 text-center me-1">Loading...</p>
                        : <Outlet /> //these are the child protected routes in AppRoutes components
            }
        </>
    )
}

export default PersistLogin