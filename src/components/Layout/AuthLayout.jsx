import React from 'react'
import styles from './AuthLayout.module.css'

export default function AuthLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>{children}</div>
    </div>
  )
}
