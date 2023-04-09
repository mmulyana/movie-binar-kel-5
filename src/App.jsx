import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Detail, Home, Search } from './pages'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/search/:search', element: <Search /> },
  { path: '/detail/:idMovie', element: <Detail /> },
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
