{/* Imports StrictMode from React */}
import { StrictMode } from 'react'
{/* I need createRoot here it seems */}
import { createRoot } from 'react-dom/client'
{/* Import other stuff required from other files */}
import '../index.css'
import App from './App.jsx'

{/* Find element with id root, create a react root and tell react what should be displayed */}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)