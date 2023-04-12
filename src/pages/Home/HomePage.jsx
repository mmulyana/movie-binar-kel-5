import React from 'react'
import styles from './HomePage.module.css'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import { BaseLayout } from '../../components'
import useFetch from '../../hooks/useFetch'
import Card from '../../components/Card'

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
              className={styles.imageCarousel}
              src={BASE_URL_IMAGE + data?.backdrop_path}
            />
            <div className={styles.layerCarousel}></div>
            <div className={styles.containerCarousel}>
              <div className={styles.containerInnerCarousel}>
                <h3 className={styles.titleCarousel}>{data.title}</h3>
                <p className={styles.overviewCarousel}>{data.overview}</p>
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
            <Card data={data} key={index} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default HomePage
