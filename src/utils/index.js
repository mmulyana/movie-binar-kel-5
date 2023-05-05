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

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export { filterImage, checkAuth, parseJwt }
