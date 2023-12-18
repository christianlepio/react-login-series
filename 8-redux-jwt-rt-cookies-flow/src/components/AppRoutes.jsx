//react router dom
import { Routes, Route } from "react-router-dom"
//components
import Layout from "./Layout"
import InitialPage from "./InitialPage"
import Login from "../features/auth/components/Login"
import Welcome from "../features/auth/components/Welcome"
import RequireAuth from "../features/auth/components/RequireAuth"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes here */}
                <Route index element={<InitialPage />} />
                <Route path="login" element={<Login />} />

                {/* protected routes here */}
                <Route element={<RequireAuth />}>
                    <Route path="welcome" element={<Welcome />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes