import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Home = () => {
    //custom hook to get setAuth state from context 
    const { setAuth } = useAuth()
    //initialize useNavigate()
    const navigate = useNavigate()

    const logout = () => {
        //if used in more components, this should be in context
        //use axios to /logout endpoint
        setAuth({})
        navigate('/linkpage')
    }

    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center homie">
            <h1 className="h1 mb-4 mt-2 text-center">HOME PAGE</h1> 
            <p className="lead mb-4 text-center">You are logged in!</p>

            <p className="lead mb-3">Go to <Link to='/editor'>Editor's</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/admin'>Admin's</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/lounge'>Lounge's</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/linkpage'>Link's</Link> Page</p>

            <div className="d-flex">
                <button 
                    type="button"
                    className="btn btn-warning flex-grow-1 mt-2"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </div>
        </section>
    )
}

export default Home