import { Routes, Route } from 'react-router-dom'
import { BaseLayout } from '../components'
import { Detail, Home, Search } from '../pages'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Route>
    </Routes>
  )
}
