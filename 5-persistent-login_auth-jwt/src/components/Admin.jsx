import { Link } from "react-router-dom"
import User from "./User"

const Admin = () => {
    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center homie">
            <h1 className="h1 mb-4 mt-2 text-center">ADMIN'S PAGE</h1> 
            <User />
            <p className="lead mt-3 mb-3 text-center">Go to <Link to='/'>Home</Link> Page</p>
        </section>
    )
}

export default Admin