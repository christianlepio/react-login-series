import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//components
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

function App() {
  return (
    <main>
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
    </main>
  )
}

export default App
