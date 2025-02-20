import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import "./i18n.js";  
 
const root =createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
