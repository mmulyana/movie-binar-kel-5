import React from 'react'
import styles from './HomePage.module.css'
import useFetch from '../../hooks/useFetch'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
function HomePage() {
  const { data, error, loading } = useFetch(getRequestURL('upcoming'))

  if (!data) {
    return <p>Loading</p>
  }

  return (
    <div>
      <Carousel>
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
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
        {data.results.slice(0, 5).map((data, index) => (
          <div key={index}>
            <h4>{data.title}</h4>
            <img src={BASE_URL_IMAGE + data?.backdrop_path} alt='First slide' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
