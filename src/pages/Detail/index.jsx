import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { BASE_URL, BASE_URL_IMAGE } from '../../utils/requests'
import styles from './index.module.css'

export default function Detail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `${BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`,
  )

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{erorr}</p>
  }

  console.log(data)

  return (
    <>
      <div className={styles.bgWrapper}>
        <img
          src={BASE_URL_IMAGE + data?.backdrop_path}
          className={styles.bgImg}
        />
      </div>
    </>
  )
}
