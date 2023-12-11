import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
    //create custom hook to eliminate manual calling of context in the component
    return useContext(AuthContext)
}

export default useAuth