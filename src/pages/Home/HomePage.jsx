import React from 'react'
import styles from './HomePage.module.css'
import useFetch from '../../hooks/useFetch'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import { Carousel } from 'react-bootstrap'

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
      <div className=''></div>
    </div>
  )
}

export default HomePage
