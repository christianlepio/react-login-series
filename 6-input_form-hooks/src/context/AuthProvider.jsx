//global auth state for JWT

import { createContext, useState } from "react";

//create context react hook
const AuthContext = createContext({})

//create Auth provider and the children represents the components
export const AuthProvider = ({ children }) => {
    //state container that will use to store the username, pwd, roles, and access token response from the backend
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider 
            value={
                {
                    //these props here will be accessible by the components
                    auth, 
                    setAuth
                }
            }
        >
            {/* possible components */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext