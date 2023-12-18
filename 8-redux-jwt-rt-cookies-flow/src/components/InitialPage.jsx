import { Link } from "react-router-dom"

const InitialPage = () => {
    return (
        <>
            {/* this works like a href tag in html */}
            <Link to='/login'>Employee Login</Link>
        </>
    )
}

export default InitialPage