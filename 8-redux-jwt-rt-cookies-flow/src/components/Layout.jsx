import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="d-flex justify-content-center">
            {/* outlet here are the children routes */}
            <Outlet /> 
        </main>
    )
}

export default Layout