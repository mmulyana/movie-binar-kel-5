import { Routes, Route } from 'react-router-dom'
import { Detail, Home, Search } from '../pages'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:search' element={<Search />} />
      <Route path='/movie/:idMovie' element={<Detail />} />
      <Route path='*' element={<Home/>}/>
    </Routes>
  )
}
