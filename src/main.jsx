import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { detectWordmarkFont } from './brandFont.js'
import './index.css'
import './components.css'

detectWordmarkFont()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
