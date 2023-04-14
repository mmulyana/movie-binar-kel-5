import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BASE_URL, BASE_URL_IMAGE } from '../../utils/requests'
import { BaseLayout } from '../../components'
import styles from './index.module.css'
import Card from '../../components/Card'

function Search() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const search = queryParams.get('query')
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
    <BaseLayout isLight>
      <div className='container' style={{ paddingTop: `80px` }}>
        <h3 className={styles.title}>Search Movies "{search}"</h3>
        <div className={styles.movieWrapperSearch}>
          {movies?.map((movie) => (
            <Card data={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Search
