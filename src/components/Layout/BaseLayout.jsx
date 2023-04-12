import Navbar from '../Navbar'
import styles from './BaseLayout.module.css'

export default function BaseLayout({ children, isLight }) {
  return (
    <>
      <Navbar isLight={isLight}/>
      <main className={styles.bodyWrapper}>{children}</main>
    </>
  )
}
