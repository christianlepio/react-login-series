//react router dom
import { Routes, Route } from "react-router-dom"
//components
import Layout from "./Layout"
import InitialPage from "./InitialPage"
import Login from "../features/auth/components/Login"
import Welcome from "../features/auth/components/Welcome"
import RequireAuth from "../features/auth/components/RequireAuth"
import UsersList from "../features/users/components/UsersList"

const AppRoutes = () => {
    return (
        <Routes>
            {/* parent route */}
            <Route path="/" element={<Layout />}>
                {/* children routes */}
                {/* public routes here */}
                {/* index keyword means this is the default page of Layout. */}
                <Route index element={<InitialPage />} />
                <Route path="login" element={<Login />} />

                {/* protected routes here */}
                {/* nested routes */}
                <Route element={<RequireAuth />}>
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="userslist" element={<UsersList />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes