import React from 'react'

import { Outlet } from 'react-router-dom'
import styles from './BaseLayout.module.css'
import Navbar from '../Navbar'

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <div className={styles.bodyWrapper}>
        <Outlet />
      </div>
    </>
  )
}
