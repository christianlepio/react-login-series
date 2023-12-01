import { useEffect, useRef, useState } from "react"

const Login = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    //check if username, password has a value.
    //this will return either true or false for disabling sign in button
    const canSignIn = [user, pwd,].every(Boolean)

    return (
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

export default Login