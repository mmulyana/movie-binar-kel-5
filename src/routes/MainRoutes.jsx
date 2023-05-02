import { Routes, Route } from 'react-router-dom'
import { Detail, Error, Home, Register, Search } from '../pages'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />

      <Route path='/detail/:id' element={<Detail />} />

      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}
