import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema } from '../../utils/schema'
import { AuthLayout } from '../../components/Layout'
import GoogleLogin from '../../components/GoogleLogin'
import googleIcon from '../../assets/images/google.png'

import styles from './index.module.css'
import { parseJwt } from '../../utils'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authAction'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { value, name } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await loginSchema.validate(formData, { abortEarly: false })
      setErrors({})
      handleLogin(formData)
    } catch (errors) {
      // validation failed, display error messages
      const errorMessages = {}
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message
      })
      console.log(errorMessages)
      setErrors(errorMessages)
    }
  }

  async function handleLogin(form) {
    const { email, password } = form
    let data = {
      email,
      password,
    }

    dispatch(login(data, navigate))
  }

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <h1
          style={{
            fontSize: '22px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Sign In
        </h1>

        <GoogleLogin>
          <img src={googleIcon} style={{ height: '20px', objectFit: 'fit' }} />
          Sign in with Google
        </GoogleLogin>

        <div style={{ position: 'relative' }}>
          <hr style={{ color: '#878484' }} />
          <div
            style={{
              width: '30px',
              height: '40px',
              background: '#fff',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ paddingTop: '6px' }}>or</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.textfieldgroup}>
            <label htmlFor='name'>
              Name <span>*</span>
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div className={styles.textfieldgroup}>
            <label htmlFor='name'>
              Name <span>*</span>
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className='error'>{errors.password}</p>}
          </div>

          <button type='submit' className={styles.btn}>
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '8px' }}>
          Don't have account?{' '}
          <Link
            style={{ textDecoration: 'none', fontWeight: '600' }}
            to='/register'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
