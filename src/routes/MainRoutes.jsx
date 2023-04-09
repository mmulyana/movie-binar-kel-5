import { Routes, Route } from 'react-router-dom'
import { Detail, Home, Search } from '../pages'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:param' element={<Search />} />
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
  )
}
