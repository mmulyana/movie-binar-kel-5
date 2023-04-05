import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { BASE_URL, BASE_URL_IMAGE } from '../../utils/requests'
import styles from './index.module.css'
import { BsStar, BsPlayCircle } from 'react-icons/bs'

export default function Detail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `${BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`,
  )

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>error</p>
  }

  console.log(data)

  if (data) {
    return (
      <>
        <div
          className={styles.bgWrapper}
          style={{
            backgroundImage: `url(${BASE_URL_IMAGE + data?.backdrop_path})`,
          }}
        >
          <div className={styles.bgLayerWrapper}>
            <div className={styles.bgLayerContainer}>
              <h1 className={styles.title}>
                {data.original_title ? data.original_title : null}
              </h1>
              <p style={{ paddingTop: '10px', color: 'white' }}>
                {data.tagline && data.tagline}
              </p>
              <div className={styles.genresWrapper}>
                {data?.genres.map(({ id, name }) => (
                  <span key={id} className={styles.genres}>
                    {name}
                  </span>
                ))}
              </div>
              <p className={styles.overview}>{data?.overview}</p>
              <div style={{ paddingTop: '1rem', display: 'flex', gap: '10px' }}>
                <span className={styles.star}>
                  <BsStar />
                </span>
                <p style={{ color: 'white' }}>
                  {Math.floor(data.vote_average)} / 10
                </p>
              </div>

              <button className={styles.btnWatchlist}>
                <BsPlayCircle /> Watch Trailer
              </button>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.48)',
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '100%',
            }}
          ></div>
        </div>
      </>
    )
  }
}
