import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import styles from './BaseLayout.module.css'

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
