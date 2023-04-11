import Navbar from '../Navbar'
import styles from './BaseLayout.module.css'

export default function BaseLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className={styles.bodyWrapper}>{children}</main>
    </>
  )
}
