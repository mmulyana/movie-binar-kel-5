import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import styles from './index.module.css'
import MediaQuery from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../../redux/actions/authAction'
import { setIsLoggedIn, setToken } from '../../redux/reducers/authReducer'

export default function Navbar({ isLight }) {
  const navigate = useNavigate()
  const searchVal = useRef()
  const dispatch = useDispatch()

  const [offset, setOffset] = useState(0)
  const [isOpenSearch, setIsOpenSearch] = useState(false)

  const { isLoggedIn, user } = useSelector((s) => s.auth)

  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    if (token) {
      dispatch(setToken(token))

      if (!!dispatch(getMe())) dispatch(setIsLoggedIn(true))
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function logout() {
    localStorage.clear('token')
    navigate('/login')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const searchValue = searchVal?.current.value
    navigate(`/search?query=${searchValue}`)
  }

  function handleOpenSearch() {
    setIsOpenSearch(!isOpenSearch)
  }

  function handleOpenSearch() {
    setIsOpenSearch(!isOpenSearch)
  }

  return (
    <div className={offset > 0 ? styles.navWrapperActive : styles.navWrapper}>
      <div className={styles.container}>
        <MediaQuery minWidth={786}>
          <Link to='/' className={styles.brand}>
            Movielist
          </Link>
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
                placeholder='What do you want to watch'
                ref={searchVal}
              />
              <span
                onClick={handleSubmit}
                className={
                  isLight && offset > 0
                    ? styles.iconDarkActice
                    : isLight
                    ? styles.iconDark
                    : styles.iconLight
                }
              >
                <BsSearch />
              </span>
            </div>
            <button type='submit' hidden></button>
          </form>
          {isLoggedIn ? (
            <button
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.btnLogin}
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className={styles.btnWrapper}>
              <button
                style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className={styles.btnLogin}
                onClick={() => navigate('/login')}
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
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          )}
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <h1 className={styles.brand}>Movielist</h1>
          <span
            onClick={handleOpenSearch}
            className={
              isLight && offset > 0
                ? styles.iconDarkActice
                : isLight
                ? styles.iconDark
                : styles.iconLight
            }
          >
            <BsSearch />
          </span>
        </MediaQuery>
      </div>
    </div>
  )
}
