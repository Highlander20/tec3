import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import Login from './components/Login/LoginPage'
import Main from './components/Main/Main'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
