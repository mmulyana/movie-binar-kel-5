import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { BASE_URL, BASE_URL_IMAGE, getRequestURL } from '../../utils/requests'
import styles from './index.module.css'
import { BsStar, BsPlayCircle, BsStarFill } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BaseLayout } from '../../components'
import { useEffect, useState } from 'react'

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
              <Skeleton style={{height: '80px', marginBottom:'8px'}}/>
              <Skeleton count={3} className={{marginTop: '10px'}} />
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
          <p
            style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}
          >
            Review of {data?.title}
          </p>
          <div className={styles.reviewWrapper}>
            {dataReview?.results && dataReview.results.length > 10
              ? dataReview.results
                  .slice(0, 5)
                  .map(({ author, author_details, content }, index) => (
                    <div className={styles.reviewBox} key={index}>
                      <div className={styles.reviewBoxLeft}>
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
                        <div>
                          <p style={{fontSize: '18px', fontWeight: '700'}}>{author}</p>
                          <div style={{display:'flex', gap: '8px', alignItems: 'items-center', marginTop: '4px'}}>
                            <span style={{color: '#474E68'}}>{author_details.rating}</span>
                            <span style={{color: '#FFD93D'}}>
                            <BsStarFill />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.reviewBoxRight}>
                        <p>{content}</p>
                      </div>
                    </div>
                  ))
              : ({ author, author_details, content }, index) => (
                  <div className={styles.reviewBox} key={index}>
                    <div className={styles.reviewBoxLeft}>
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
                      <p>{author}</p>
                    </div>
                    <div className={styles.reviewBoxRight}>
                      <p>{content}</p>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </BaseLayout>
    )
  }
}
