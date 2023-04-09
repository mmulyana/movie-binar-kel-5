import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Detail, Home, Search } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:search' element={<Search />} />
        <Route path='/movie/:idMovie' element={<Detail />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
