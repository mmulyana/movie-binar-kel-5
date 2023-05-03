import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <MainRoutes />
      <ToastContainer theme='colored'/>
    </BrowserRouter>
  )
}

export default App
