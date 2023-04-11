import React from 'react'
import styles from './HomePage.module.css'
import useFetch from '../WHA../hooks/useFetch'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import { BaseLayout } from '../../components'


function HomePage() {
  const { data } = useFetch(getRequestURL('upcoming'))

  if (!data) {
    return (
      <BaseLayout>
        <Skeleton style={{ height: '800px' }} />
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <Carousel style={{height: '80vh', overflow: 'hidden', zIndex: '-1'}}>
        {data.results.slice(0, 3).map((data) => (
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={BASE_URL_IMAGE + data?.backdrop_path}
              alt='First slide'
            />
            <div style={{ position: 'absolute', left: '0', zIndex: '2' }}>
              <Carousel.Caption>
                <h3>{data.original_title}</h3>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div>
        <div className='d-flex justify-content-between'>
          <h2>Popular Movie</h2>
          <button>
            <Link to='/upcoming'>
              See All Movie <AiOutlineArrowRight />
            </Link>
          </button>
        </div>
        <div className={styles.cardMovieWrapper}>
          {data.results.slice(0, 5).map((data, index) => (
            <div
              key={index}
              className={styles.cardItem}
              style={{
                backgroundImage: `url(${BASE_URL_IMAGE + data?.backdrop_path})`,
              }}
            >
              <div className={styles.cardBody}>
                <h4>{data.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default HomePage
