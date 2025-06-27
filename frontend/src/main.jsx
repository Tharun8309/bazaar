import { AuthProvider } from './contexts/AuthContext.jsx';
import { CustomerProvider } from './contexts/CustomerContext.jsx';
import { SellerProvider } from './contexts/SellerContext.jsx';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CustomerProvider>
      <SellerProvider>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </SellerProvider>
    </CustomerProvider>
  </AuthProvider>
)
