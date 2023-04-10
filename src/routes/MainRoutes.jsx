import { Routes, Route } from 'react-router-dom'
import { BaseLayout } from '../components'
import { Detail, Home, Search } from '../pages'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path='search'>
          <Route path=':search' element={<Search />} />
        </Route>

        <Route path='detail'>
          <Route path=':id' element={<Detail />} />
        </Route>
      </Route>
    </Routes>
  )
}
