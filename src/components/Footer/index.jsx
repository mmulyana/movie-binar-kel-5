import { Link } from 'react-router-dom'
import { BsGithub } from 'react-icons/bs'
import styles from './index.module.css'

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <p>© 2023 kelompok 5. All right reserved</p>
        <Link to='https://github.com/mulyant20/movie-binar-kel-5'>
          <BsGithub />
        </Link>
      </div>
    </div>
  )
}
