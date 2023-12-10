import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    //custom hook to get setAuth state from context 
    const { setAuth } = useAuth()

    //function when user logs out
    const logout = async () => {
        // clear auth values
        setAuth({})

        try {
            const response = await axios.get('/logout', {
                //this is required because it allows as to send cookies with our request
                //this request is going to send along the cookie that has a response token and that 
                //is a secured cookie that we never see inside out javascript code but axios can send it to
                //the backend enpoint that we needed to.
                withCredentials: true
            })
        } catch (err) {
            console.error(err)
        }
    }

    return logout
}

export default useLogout