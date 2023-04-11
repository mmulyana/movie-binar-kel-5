import React from 'react'
import styles from './HomePage.module.css'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import { BaseLayout } from '../../components'
import useFetch from '../../hooks/useFetch'

function HomePage() {
  const { data } = useFetch(getRequestURL('upcoming'))

  if (!data) {
    return (
      <BaseLayout>
        <div className='container'>
          <Skeleton
            style={{ height: '80px', marginTop: '80px', width: '100%' }}
          />
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <Carousel controls={false} fade style={{ height: '80vh', zIndex: '11' }}>
        {data.results.slice(0, 3).map((data, index) => (
          <Carousel.Item key={index} style={{ height: '80vh' }} interval={4500}>
            <img
              style={{
                objectFit: 'cover',
                // objectPosition: 'center',
                width: '100%',
                position: 'absolute',
                left: '0',
                top: '0',
              }}
              src={BASE_URL_IMAGE + data?.backdrop_path}
            />
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                background: 'rgba(0,0,0,0.6)',
                width: '100%',
                height: '100%',
              }}
            ></div>
            <div
              style={{
                maxWidth: '1200px',
                marginInline: 'center',
                height: '100%',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '1',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '40%',
                  transform: 'translateY(0)',
                }}
              >
                <h3
                  style={{
                    textAlign: 'left',
                    color: 'white',
                    fontSize: '40px',
                    fontWeight: '600',
                  }}
                >
                  {data.title}
                </h3>
                <p
                  style={{
                    maxWidth: '800px',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {data.overview}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className='container'>
        <div className={styles.moviesWrapper}>
          <h2 className={styles.moviesSectionTitle}>Popular Movie</h2>
          <Link to='/upcoming' className={styles.btnAllMovies}>
            See All Movie
            <span className={styles.btnIcon}>
              <AiOutlineArrowRight />
            </span>
          </Link>
        </div>
        <div className='cardMovieWrapper'>
          {data.results.slice(0, 5).map((data, index) => (
            <div
              key={index}
              className='cardItem'
              style={{
                backgroundImage: `url(${BASE_URL_IMAGE + data?.backdrop_path})`,
              }}
            >
              <div className='cardBody'>
                <Link className='cardTitle' to={`/detail/${data.id}`}>
                  {data.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default HomePage
