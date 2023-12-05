import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center homie">
            <h1 className="h1 mb-4 mt-2 text-center">LINKS</h1>

            <h2 className="h2 mb-4 mt-2">Public</h2>
            <p className="lead mb-3">Go to <Link to='/login'>Login</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/register'>Registration</Link> Page</p>

            <h2 className="h2 mb-4 mt-5">Private</h2>
            <p className="lead mb-3">Go to <Link to='/'>Home</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/editor'>Editor's</Link> Page</p>
            <p className="lead mb-3">Go to <Link to='/admin'>Admin's</Link> Page</p>
        </section>
    )
}

export default LinkPage