import React from 'react'
import { BASE_URL_IMAGE } from '../../utils/requests'
import { BsStarFill } from 'react-icons/bs'
import styles from './index.module.css'

const GRAVATAR = 'https://www.gravatar.com/avatar/87b1f10dd7dae245ac84657537983336.jpg'

export default function Review({data}) {
  return (
    <div className={styles.reviewBox}>
      <div className={styles.reviewBoxLeft}>
        <img
          src={
            data.author_details.avatar_path
              ? data.author_details.avatar_path?.includes('gravatar')
                ? data.author_details.avatar_path.substring(1)
                : `${BASE_URL_IMAGE}${data.author_details.avatar_path}`
              : GRAVATAR
          }
          className={styles.avatarImg}
        />
        <div>
          <p style={{ fontSize: '18px', fontWeight: '700' }}>{data.author}</p>
        </div>
      </div>
      <div className={styles.reviewBoxRight}>
        <p>{data.content}</p>
      </div>
    </div>
  )
}
