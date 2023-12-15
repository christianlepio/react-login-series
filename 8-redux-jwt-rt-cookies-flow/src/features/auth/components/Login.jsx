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

    const content = isLoading 
        ? <h1 className="text-center h1 mb-5">Loading...</h1>
        : (
            <section>
                
            </section>
        )

    return (
        <div>Login</div>
    )
}

export default Login