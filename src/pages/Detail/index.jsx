import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { BASE_URL, BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import styles from './index.module.css'
import { BsStar, BsPlayCircle } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BaseLayout } from '../../components'

const GRAVATAR =
  'https://www.gravatar.com/avatar/87b1f10dd7dae245ac84657537983336.jpg'

export default function Detail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(getRequestURL('detail', id))
  const { data: dataReview } = useFetch(getRequestURL('review', id))

  if (loading) {
    return (
      <BaseLayout>
        <div className={styles.bgWrapper}>
          <div className={styles.bgLayerWrapper}>
            <div className={styles.bgLayerContainer}>
              <Skeleton />
              <Skeleton count={5} />
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }

  if (error) {
    return (
      <BaseLayout>
        <div className={styles.bgWrapper}>
          <div className={styles.bgLayerWrapper}>
            <div className={styles.bgLayerContainer}>
              <p>error</p>
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }

  console.log(dataReview)

  if (data) {
    return (
      <BaseLayout>
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
        <div className={styles.containerReviews}>
          <p>Review of {data?.title}</p>
          <ul>
            {dataReview?.results?.map(
              ({ author, author_details, content }, index) => (
                <li key={index}>
                  <p>{author}</p>
                  <img
                    src={
                      author_details.avatar_path
                        ? author_details.avatar_path?.includes('gravatar')
                          ? author_details.avatar_path.substring(1)
                          : `${BASE_URL_IMAGE}${author_details.avatar_path}`
                        : GRAVATAR
                    }
                    className={styles.avatarImg}
                  />
                  <p>{content}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </BaseLayout>
    )
  }
}
