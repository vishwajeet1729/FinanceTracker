import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       
    <ClerkProvider publishableKey="pk_test_bmF0aXZlLXRhZHBvbGUtOTkuY2xlcmsuY" afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)