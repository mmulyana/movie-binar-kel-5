import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <MainRoutes />
        <ToastContainer theme='colored' />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
