//auth0 hook
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
    //get functions / variables from useAuth0 hook
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated && (
            <button
                onClick={() => loginWithRedirect()}
            >
                Sign In
            </button>
        )
    )
}

export default LoginButton