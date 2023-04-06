// import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'

function App() {
//   const [hasAuth, setHasAuth] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <MainRoutes />
      </Routes>
    </BrowserRouter>
  )
}

export default App
