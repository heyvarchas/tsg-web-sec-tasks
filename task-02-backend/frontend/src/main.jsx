{/* Import StrictMode from React */}
import { StrictMode } from 'react'
{/* Import the createRoot() function from react-dom/client */}
import { createRoot } from 'react-dom/client'
{/* Import necessary functions/files */}
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
