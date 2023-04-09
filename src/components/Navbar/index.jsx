import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import styles from './index.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const searchVal = useRef()

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/search/${searchVal?.current.value}`)
  }

  return (
    <div className={offset > 0 ? styles.navWrapperActive : styles.navWrapper}>
      <div className={styles.container}>
        <h1 className={styles.brand}>Movielist</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.textfieldGroup}>
            <input
              className={styles.textfield}
              placeholder='What do you want to watch'
              ref={searchVal}
            />
            <span
              style={{
                color: 'white',
                fontSize: '20px',
                position: 'absolute',
                top: '54%',
                right: '1rem',
                transform: 'translateY(-50%)',
              }}
            >
              <BsSearch />
            </span>
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
