import { useState } from 'react'
import MainRoutes from './routes/MainRoutes'

function App() {
  const [hasAuth, setHasAuth] = useState(true)

  if (hasAuth) {
    return <MainRoutes />
  }
}

export default App
