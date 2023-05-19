import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import styles from './index.module.css'
import { BsStar, BsPlayCircle } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BaseLayout, Modal } from '../../components'
import imgOops from '../../assets/images/oops.png'
import Review from '../../components/Review'
import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import { checkAuth, filterImage } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovieDetail,
  fetchRecomendation,
  fetchReview,
  removeMovie,
} from '../../redux/reducers/moviesReducer'

export default function Detail() {
  const { detail: data, reviews: dataReview, recomendation: dataRecommendations } = useSelector((s) => s.movies)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [video, setVideo] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    if (checkAuth()) {
      navigate('/login', { replace: true })
    }
  }, [])

  useEffect(() => {
    dispatch(fetchMovieDetail(id))
    dispatch(fetchRecomendation(id))
    dispatch(fetchReview(id))

    return () => dispatch(removeMovie())
  }, [id])

  async function getMovieVideo() {
    const res = await fetch(getRequestURL('videos', id))
    const data = await res.json()
    setVideo(data.results)
    setIsOpenModal(true)
  }

  function closeModal() {
    setIsOpenModal(false)
    setVideo(null)
  }

  if (!data) {
    return (
      <BaseLayout>
        <div className={styles.bgWrapper}>
          <div className={styles.bgLayerWrapper}>
            <div className={styles.bgLayerContainer}>
              <Skeleton style={{ height: '80px', marginBottom: '8px' }} />
              <Skeleton count={3} className={{ marginTop: '10px' }} />
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div>
        <div
          className={styles.bgWrapper}
          style={{
            backgroundImage: `url(${BASE_URL_IMAGE + filterImage(data)})`,
          }}
        >
          <div className={styles.bgLayerWrapper}>
            <div className={styles.bgLayerContainer}>
              <h1 className={styles.title}>{data.title}</h1>
              <p style={{ paddingTop: '10px', color: 'white' }}>
                {data.tagline && data.tagline}
              </p>

              <div className={styles.genresWrapper}>
                {data.genres &&
                  data.genres.map(({ id, name }) => (
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

              <button className={styles.btnWatchlist} onClick={getMovieVideo}>
                <BsPlayCircle /> Watch Trailer
              </button>
            </div>
          </div>
          <div className={styles.layer}></div>
        </div>

        <div className={styles.container}>
          <p className={styles.titleContainer}>Review of {data?.title}</p>
          <div className={styles.reviewWrapper}>
            {dataReview && dataReview.length > 0 ? (
              dataReview.length > 10 ? (
                dataReview
                  .slice(0, 5)
                  .map((data, index) => <Review data={data} key={index} />)
              ) : (
                dataReview.map((data, index) => (
                  <Review data={data} key={index} />
                ))
              )
            ) : (
              <div className={styles.imgReviewWrapper}>
                <p>Oops! Something went wrong. Please try again later.</p>
                <img src={imgOops} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.container}>
          <p className={styles.titleContainer}>Recommendation</p>
          <div className={styles.moviesWrapper}>
            {dataRecommendations &&
              dataRecommendations
                .slice(0, 5)
                .map((data, index) => <Card key={index} data={data} />)}
          </div>
        </div>
      </div>

      {isOpenModal && <Modal data={video} onclose={closeModal} />}
    </BaseLayout>
  )
}
