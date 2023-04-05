const BASE_URL = 'https://api.themoviedb.org/3'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

const requests = {
  topRated: `${BASE_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`,
  action: `${BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=28`,
  personPopular: `${BASE_URL}/person/popular?api_key=${import.meta.env.VITE_API_KEY}`,
}

export { BASE_URL, BASE_URL_IMAGE, requests}