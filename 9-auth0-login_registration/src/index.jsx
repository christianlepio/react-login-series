import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'


console.log('env variables: ', import.meta.env)
//get values from env variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

console.log('domain: ', domain)
console.log('clientId: ', clientId)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the app component inside the auth0 provider
        auth0 provider needs props domain, clientId, and redirectUri
    */}
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
