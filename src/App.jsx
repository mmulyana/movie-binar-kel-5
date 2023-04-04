import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'

function App() {
  const [hasAuth, setHasAuth] = useState(true)

  return <BrowserRouter>{hasAuth ? <MainRoutes /> : null}</BrowserRouter>
}

export default App
