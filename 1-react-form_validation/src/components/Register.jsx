import { useEffect, useRef, useState } from "react"

// [a-zA-Z] : must start with lower or uppercase letter
// [a-zA-Z0-9-_]{3,23}$ : must followed by 3-23 characters that is lower/uppercase, digits, hypens, or underscore
// overall 24 maximum characters for username
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// password value hould be atleast 8-24 characters that
// requires atleast 1 lower & uppercase letters, digit, and special char
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        //focus on username input when this component loads
        userRef.current.focus()
    }, [])

    useEffect(() => {
        //validate username using USER_REGEX
        const result = USER_REGEX.test(user)
        console.log('userValid?: ', result)
        console.log('user: ', user)
        //will return true if valid username, false if not valid
        setValidName(result)
    }, [user]) //will trigger if user input changes

    useEffect(() => {
        //validate password using PWD_REGEX
        const result = PWD_REGEX.test(pwd)
        console.log('pwdValid?: ', result)
        console.log('password: ', pwd)
        //will return true if valid password, false if not valid
        setValidPwd(result)

        //will return true if pwd matches to re-pwd, false if not
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd]) //will trigger if pass and re-pass input changes

    useEffect(() => {
        //clear value of error msg
        setErrMsg('')
    }, [user, pwd, matchPwd]) //will trigger if user, pwd, re-pwd input changes

    //check if username, password, match password are all true.
    //this will return either true or false for disabling sign in button
    const canSignIn = [validName, validPwd, validMatch].every(Boolean)

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center">
            {errMsg ? 
                <div ref={errRef} className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{errMsg}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                : null
            }

            <h1 className="fs-1 mb-4 mt-2 text-center">REGISTRATION FORM</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input 
                        type="text" 
                        id="usernameInput"
                        placeholder="Enter username here:"
                        className={"form-control mb-1 " + (user ? validName ? 'is-valid' : 'is-invalid' : null)}
                        ref={userRef}
                        autoComplete="off" //to avoid auto suggestion of values from the input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        onFocus={() => setUserFocus(true)} //this will be the indicator if the screen is focused on username input
                        onBlur={() => setUserFocus(false)} //this will be the indicator if the screen is not focused on username input
                        required
                    />
                    <div className={userFocus ? user ? validName ? 'valid-feedback' : 'invalid-feedback' : null : null}>
                        {userFocus 
                            ? user 
                                ? validName
                                    ? ( <p>Username looks good!</p> )
                                    : ( <p>
                                            Username should be at least 4 to 24 characters long. <br/> 
                                            Must begin with a letter. <br/>  
                                            Numbers, underscores, hypens are allowed. 
                                        </p> )
                                : null 
                            : null
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwdInput" className="form-label">Password</label>
                    <input 
                        type="password" 
                        id="pwdInput"
                        placeholder="Enter password here:" 
                        className={"form-control mb-1 " + (pwd ? validPwd ? 'is-valid' : 'is-invalid' : null)}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        required
                    />
                    <div className={pwdFocus ? pwd ? validPwd ? 'valid-feedback' : 'invalid-feedback' : null : null}>
                        {pwdFocus 
                            ? pwd 
                                ? validPwd
                                    ? ( <p>Password looks good!</p> )
                                    : ( <p>
                                            Password should be at least 8 to 24 characters long. <br/> 
                                            Must include upper & lower case, a number, and <br/>
                                            special characters. <br/>
                                            Allowed special characters: ! @ # $ %  
                                        </p> )
                                : null 
                            : null
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPwd" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPwd"
                        placeholder="Re-type password here:" 
                        className={"form-control " + (matchPwd ? validMatch ? 'is-valid' : 'is-invalid' : null)}
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                    />
                    <div className={matchFocus ? matchPwd ? validMatch ? 'valid-feedback' : 'invalid-feedback' : null : null}>
                        {matchFocus 
                            ? matchPwd 
                                ? validMatch
                                    ? ( <p>Password matched!</p> )
                                    : ( <p>Password not matched.</p> )
                                : null 
                            : null
                        }
                    </div>
                </div>
                <div className="d-flex">
                    <button 
                        className="btn btn-success flex-grow-1 mt-2"
                        disabled={!canSignIn}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            
            <p className="text-center fs-6 mt-3">
                Already registered? <br />
                <a href="#">Sign In</a>
            </p>

        </section>
    )
}

export default Register