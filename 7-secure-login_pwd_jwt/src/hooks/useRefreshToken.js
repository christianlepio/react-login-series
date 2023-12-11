//custom hooks to get accessToken

import axios from "../api/axios"
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        // request accessToken with /refresh route from the backend
        const response = await axios.get('/refresh', {
            //this is required because it allows as to send cookies with our request
            //this request is going to send along the cookie that has a response token and that 
            //is a secured cookie that we never see inside out javascript code but axios can send it to
            //the backend enpoint that we needed to.
            withCredentials: true
        })

        setAuth(prev => {
            console.log('prevAccessToken: ', JSON.stringify(prev))
            console.log('newAccessToken: ', response.data.accessToken)
            //return new accessToken, and roles value from response 
            return { 
                ...prev, 
                roles: response.data.roles, 
                accessToken: response.data.accessToken                
            }
        })
        //this will call inside other component to get new accessToken
        return response.data.accessToken

    }

    return refresh
}

export default useRefreshToken