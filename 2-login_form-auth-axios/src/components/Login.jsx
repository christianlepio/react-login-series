import { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios"

const LOGIN_URL = '/auth' //endpoint url for backend api (nodeJS: 14-Data-Models)

const Login = () => {
    //get setAuth state from context 
    const { setAuth } = useContext(AuthContext)

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        //focus on user input when page loads
        userRef.current.focus()
    }, [])

    useEffect(() => {
        //clear error msg when user and password changes
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, 
                //provide the payload (data you are sending)
                //user and pwd is what our backend is expecting with exact property name
                //this may be userName: user or password: pwd
                JSON.stringify({user, pwd}), 
                //third parameter here is an object that is required to post in backend
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true //this is required for CORS
                }
            )

            console.log('response.data: ', JSON.stringify(response?.data))
            console.log('JSON.stringify(response): ', JSON.stringify(response))

            //get access token from response data
            const accessToken = response?.data?.accessToken
            //get roles from response data
            const roles = response?.data?.roles
            //set obj values for global auth 
            setAuth({ user, pwd, roles, accessToken })
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response!')
            } else if (err.response?.status === 400) {
                setErrMsg('Username and Password field are required!')
            } else if (err.response?.status === 401) {
                setErrMsg('Incorrect username or password!')
            } else {
                setErrMsg('Login Failed!')
            }
            //focus screen on error msg
            errRef.current.focus()
        }        
    }

    //check if username, password has a value.
    //this will return either true or false for disabling sign in button
    const canSignIn = [user, pwd,].every(Boolean)

    return (
        <>
            {success ? 
                (
                    <section className="px-4 py-4 shadow border rounded-4 align-self-center">
                        <h1 className="h1 mb-4 mt-2 text-center">You have successfully logged in your account!</h1>
                        <p className="text-center fs-6 mt-3 lead">Go to <a href="#">Home</a> now!</p>
                    </section>
                ) : (
                    <section className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
                        <div 
                            ref={errRef} 
                            className={"alert alert-danger " + (errMsg ? null : 'd-none')} 
                            role="alert" 
                        >
                            <div><i className="bi bi-exclamation-circle me-2"></i><strong>{errMsg}</strong></div>
                        </div>

                        <h1 className="h1 mb-4 mt-2 text-center">S<u>IGN IN FOR</u>M</h1>

                        <form onSubmit={handleSubmit} className="mx-4">
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label lead">Username</label>
                                <input 
                                    type="text" 
                                    id="usernameInput"
                                    placeholder="Enter username here:"
                                    className="form-control form-control-lg mb-1"
                                    ref={userRef}
                                    autoComplete="off" //to avoid auto suggestion of values from the input
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwdInput" className="form-label lead">Password</label>
                                <input 
                                    type="password" 
                                    id="pwdInput"
                                    placeholder="Enter password here:" 
                                    className="form-control form-control-lg mb-1"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex">
                                <button 
                                    type="submit"
                                    className="btn btn-lg btn-success flex-grow-1 mt-2"
                                    disabled={!canSignIn}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                        
                        <p className="text-center fs-6 mt-3 lead">
                            Need an Account? <br />
                            <a href="#">Sign Up</a>
                        </p>

                    </section>
                )
            }
        </>
    )
}

export default Login