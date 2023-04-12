import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, BASE_URL_IMAGE } from '../../utils/requests'
import { BaseLayout } from '../../components'
import styles from './index.module.css'

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

  console.log(movies)

  return (
    <BaseLayout isLight>
      <div className='container' style={{ paddingTop: `80px` }}>
        <h3 className={styles.title}>Search Movies "{search}"</h3>
        <div className={styles.movieWrapperSearch}>
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className={styles.cardItem}
              style={{
                backgroundImage: `url(${BASE_URL_IMAGE + filterImage(movie)})`,
              }}
              alt={movie.title}
            >
              <div className='cardBody'>
                <Link className='cardTitle' to={`/detail/${movie.id}`}>
                  {movie.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

function filterImage(movie) {
  if (movie.backdrop_path !== null) {
    return movie.backdrop_path
  } else {
    return movie.poster_path
  }
}

export default Search
