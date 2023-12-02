import Login from "./components/Login"

import { AuthProvider } from "./context/AuthProvider"

function App() {
  return (
    <main className="d-flex justify-content-center">
      <AuthProvider>
        {/* wrap login component to auth provider to access the global authentication */}
        <Login />
      </AuthProvider>
    </main>
  )
}

export default App
