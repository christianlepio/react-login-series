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

                {/* we want to protect these routes */}
                <Route path="/" element={<Home />} />
                <Route path="editor" element={<Editor />} />
                <Route path="admin" element={<Admin />} />
                <Route path="lounge" element={<Lounge />} />

                {/* catch all missing page */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes