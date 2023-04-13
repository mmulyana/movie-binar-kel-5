import styles from './index.module.css'

export default function Modal({ data, onclose }) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalLayer}></div>
      <div className={styles.modalInner}>
        <iframe
          width='853'
          height='480'
          src={`https://www.youtube.com/embed/${data.key}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title={data.name}
        />
      </div>
    </div>
  )
}
