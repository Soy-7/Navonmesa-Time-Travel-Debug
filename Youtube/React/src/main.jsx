import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserPrefsProvider } from './context/UserPrefsContext.jsx'
import { ToastProvider } from './utils/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserPrefsProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </UserPrefsProvider>
  </StrictMode>,
)
