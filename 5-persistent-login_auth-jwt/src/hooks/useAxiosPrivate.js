//this hook will just be to attach the interceptors to this axios instance
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    //define refresh funciton that will give new value for acessToken
    const refresh = useRefreshToken()
    //get auth variable from context api
    const { auth } = useAuth()

    useEffect(() => {
        // add interceptors that will handle JWT tokens that we need and retry get new accessToken if it expires

        //this is for initial request after signing in
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                //if the Authorization header does not exist
                if (!config.headers['Authorization']) {
                    //set Authorization header when initial sign in
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            //error handler
            (error) => Promise.reject(error)
        )
        
        //this is when already signed in and accessToken expires, then get another acessToken
        const responseIntercept = axiosPrivate.interceptors.response.use(
            //return the response if it is good
            response => response,
            //otherwise if there is an error, this is if the token (accessToken) has expired 
            async (error) => {
                //get the previous request in error config property
                const prevRequest = error?.config
                //if error response status is forbidden (403) if the request fails due to an expired accessToken and,
                //if custom property (prevRequest) not sent (not true)
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    //set this to true to avoid endless loop
                    prevRequest.sent = true
                    //get new access token value in useRefreshToken custom hook
                    const newAccessToken = await refresh()
                    //set new access token for headers 'Authorization setting'
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    //make a request again after updating new access token
                    return axiosPrivate(prevRequest)
                }
                //if condition above fails to run then return the error
                return Promise.reject(error)
            }
        )

        // cleanup function of useEffect
        return () => {
            //remove request interceptors to avoid many request interceptors
            axiosPrivate.interceptors.request.eject(requestIntercept)
            //remove response interceptors to avoid many response interceptors
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return axiosPrivate
}

export default useAxiosPrivate