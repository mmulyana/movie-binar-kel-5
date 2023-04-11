const BASE_URL = 'https://api.themoviedb.org/3'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

const requests = {
  topRated: `${BASE_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`,
  action: `${BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=28`,
  personPopular: `${BASE_URL}/person/popular?api_key=${import.meta.env.VITE_API_KEY}`,
}

function getRequestURL(type, id) {
  switch(type) {
    case 'review':
      return `${BASE_URL}/movie/${id}/reviews?api_key=${import.meta.env.VITE_API_KEY}`
    case 'detail':
      return `${BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
    case 'videos':
      return `${BASE_URL}/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
    case 'upcoming':
      return `${BASE_URL}/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`
    default:
      return false
  }
}

export { BASE_URL, BASE_URL_IMAGE, requests, getRequestURL}