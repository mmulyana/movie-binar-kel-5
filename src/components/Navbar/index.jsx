import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import styles from './index.module.css'
import MediaQuery from 'react-responsive'

export default function Navbar({ isLight }) {
  const navigate = useNavigate()
  const searchVal = useRef()

  const [offset, setOffset] = useState(0)
  const [isOpenSearch, setIsOpenSearch] = useState(false)

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

  function handleOpenSearch() {
    setIsOpenSearch(!isOpenSearch)
  }

  return (
    <div className={offset > 0 ? styles.navWrapperActive : styles.navWrapper}>
      <div className={styles.container}>
        <MediaQuery minWidth={786}>
          <h1 className={styles.brand}>Movielist</h1>
          <form onSubmit={handleSubmit}>
            <div
              className={styles.textfieldGroup}
              style={{ paddingBottom: '4px' }}
            >
              <input
                className={
                  isLight && offset > 0
                    ? styles.textfieldDarkActive
                    : isLight
                    ? styles.textfieldDark
                    : styles.textfield
                }
                Gaceholder='What do you want to watch'
                ref={searchVal}
              />
              <span
                onClick={handleSubmit}
                style={{
                  color: 'white',
                  fontSize: '20px',
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                <BsSearch />
              </span>
            </div>
            <button type='submit' hidden></button>
          </form>
          <div className={styles.btnWrapper}>
            <button
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.btnLogin}
            >
              Login
            </button>
            <button
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.btnRegister}
            >
              Register
            </button>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <h1 className={styles.brand}>Movielist</h1>
          <button onClick={handleOpenSearch} className={styles.btnOpenSearch}>
            <BsSearch />
          </button>
        </MediaQuery>
      </div>
    </div>
  )
}
