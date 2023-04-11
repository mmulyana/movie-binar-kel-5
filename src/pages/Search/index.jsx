import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils/requests'

function Search() {
  const { search } = useParams()
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=d04391897ca2e863c33b72cb08c42cec&query=${search}`,
        )
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [search])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }

  return (
    <div style={{ paddingTop: `80px` }}>
      <h1>Search Movies</h1>
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
          </div>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  )
}

export default Search
