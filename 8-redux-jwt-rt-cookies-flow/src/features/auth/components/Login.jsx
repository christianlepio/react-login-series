import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "../authSlice"
import { useLoginMutation } from "../authApiSlice"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap()

            dispatch(setCredentials({ ...userData, user }))

            setUser('')
            setPwd('')

            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing username or password')
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }

            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)

    //check if username, password has a value.
    //this will return either true or false for disabling sign in button
    const canSignIn = [user, pwd].every(Boolean)

    const content = isLoading 
        ? <h1 className="text-center h1 mb-5">Loading...</h1>
        : (
            <section className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
                <div 
                    ref={errRef} 
                    className={"alert alert-danger " + (errMsg ? null : 'd-none')}
                    role="alert"
                >
                    <div><i className="bi bi-exclamation-circle me-2"></i><strong>{errMsg}</strong></div>
                </div>

                <h1 className="h1 mb-4 mt-2 text-center">E<u>MPLOYEE SIGN I</u>N</h1>

                <form onSubmit={handleSubmit} className="mx-4">
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className="form-label lead">Username</label>
                        <input 
                            type="text" 
                            id="usernameInput"
                            placeholder="Enter username here:"
                            className="form-control form-control-lg mb-1"
                            ref={userRef}
                            value={user}
                            onChange={handleUserInput}
                            autoComplete="off" //to avoid auto suggestion of values from the input
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
                            onChange={handlePwdInput}
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
            </section>
        )

    return content
}

export default Login