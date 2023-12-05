//react router dom
import { Routes, Route } from "react-router-dom"
//components
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import Layout from "./Layout"
import Editor from "./Editor"
import Admin from "./Admin"
import Missing from "./Missing"
import Unauthorized from "./Unauthorized"
import Lounge from "./Lounge"
import LinkPage from "./LinkPage"
import RequireAuth from "./RequireAuth"

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

const AppRoutes = () => {
    return (
        <Routes>
            {/* parent route */}
            <Route path="/" element={<Layout />}>
                {/* children routes */}
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} /> 

                {/* 
                    we want to protect these routes 
                    all of the routes that is within the RequireAuth 
                    will get protected is the user is not logged in
                */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>} >
                    {/* this route can only access by the user that has user role */}
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>} >
                    {/* this route can only access by the user that has editor role */}
                    <Route path="editor" element={<Editor />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>} >    
                    {/* this route can only access by the user that has admin role */}
                    <Route path="admin" element={<Admin />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>} >
                    {/* this route can only access by the user that has editor/admin role */}
                    <Route path="lounge" element={<Lounge />} />
                </Route>

                {/* catch all missing page */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes