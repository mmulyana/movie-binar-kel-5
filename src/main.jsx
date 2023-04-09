import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Detail, Home, Search } from './pages'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/search/:search', element: <Search /> },
  { path: '/detail/:idMovie', element: <Detail /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
