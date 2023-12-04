//context provider
import { AuthProvider } from "./context/AuthProvider"
//components
import AppRoutes from "./components/AppRoutes"
//react router dom
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* wrap login component to auth provider to access the global authentication */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
