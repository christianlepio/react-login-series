import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="d-flex justify-content-center">
            <Outlet />
        </main>
    )
}

export default Layout