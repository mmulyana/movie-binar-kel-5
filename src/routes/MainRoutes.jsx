import { Routes, Route } from 'react-router-dom'
import { Home, Search } from '../pages'
import Detail from '../pages/Detail'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:search' element={<Search />} />
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
  )
}
