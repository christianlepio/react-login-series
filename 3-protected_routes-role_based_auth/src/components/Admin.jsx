import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center homie">
            <h1 className="h1 mb-4 mt-2 text-center">ADMIN'S PAGE</h1> 
            <p className="lead mb-4 text-center">You must have been assigned an Admin role!</p>
            <p className="lead mb-3 text-center">Go to <Link to='/'>Home</Link> Page</p>
        </section>
    )
}

export default Admin