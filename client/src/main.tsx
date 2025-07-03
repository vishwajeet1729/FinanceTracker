import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY ="pk_test_bmF0aXZlLXRhZHBvbGUtOTkuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       
    <ClerkProvider publishableKey="pk_test_bmF0aXZlLXRhZHBvbGUtOTkuY2xlcmsuYWNjb3VudHMuZGV2JA" afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)