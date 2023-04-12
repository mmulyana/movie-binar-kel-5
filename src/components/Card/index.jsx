import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { BASE_URL_IMAGE } from '../../utils/requests'

export default function Card({ data }) {
  return (
    <div
      className={styles.cardItem}
      style={{ backgroundImage: `url(${BASE_URL_IMAGE + filterImage(data)})` }}
    >
      <div className={styles.cardBody}>
        <Link className={styles.cardTitle} to={`/detail/${data.id}`}>
          {data.title}
        </Link>
      </div>
    </div>
  )
}

function filterImage(movie) {
  if (movie.backdrop_path !== null) {
    return movie.backdrop_path
  } else {
    return movie.poster_path
  }
}
