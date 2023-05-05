import axios from 'axios'
import { toast } from 'react-toastify'

function filterImage(movie) {
  if (movie.backdrop_path !== null) {
    return movie.backdrop_path
  } else {
    return movie.poster_path
  }
}

function checkAuth() {
  const token = localStorage.getItem('token')

  if (token) {
    return false
  }

  return true
}

export { filterImage, checkAuth }
