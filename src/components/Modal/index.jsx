import { useState } from 'react'
import styles from './index.module.css'

export default function Modal({ data, onclose }) {
  const [index, setIndex] = useState(0)

  function nextIndex() {
    if (index < data.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalLayer} onClick={onclose}></div>
      <div className={styles.modalInner}>
        <iframe
          width='853'
          height='480'
          src={`https://www.youtube.com/embed/${data[index].key}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title={data[index].name}
        />
        <button className={styles.btn} onClick={nextIndex}>NEXT</button>
      </div>
    </div>
  )
}
