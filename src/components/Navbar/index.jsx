import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const searchVal = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/seach/${searchVal?.current}`)
  }

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <h1 className={styles.brand}>Movielist</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.textfieldGroup}>
            <input
              className={styles.textfield}
              placeholder='What do you want to watch'
              ref={searchVal}
            />
          </div>
          <button type='submit' hidden></button>
        </form>
        <div className={styles.btnWrapper}>
          <button className={styles.btnLogin}>Login</button>
          <button className={styles.btnRegister}>Register</button>
        </div>
      </div>
    </div>
  )
}
