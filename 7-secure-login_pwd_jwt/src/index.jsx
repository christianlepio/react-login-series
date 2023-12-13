import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//this is to disable accessing state variable from devtools
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

//css
import './index.css'
import 'bootstrap/dist/css/bootstrap.css' //import bootstrap css
import 'bootstrap-icons/font/bootstrap-icons.css' //import bootstrap icon
import 'bootstrap/dist/js/bootstrap.bundle.js' //import bootstrap js

//this is to disable accessing state variable from devtools if app is in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
