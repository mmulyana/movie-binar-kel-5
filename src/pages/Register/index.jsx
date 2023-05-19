import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerSchema } from '../../utils/schema'
import GoogleLogin from '../../components/GoogleLogin'
import styles from './index.module.css'
import AuthLayout from '../../components/Layout/AuthLayout'
import googleIcon from '../../assets/images/google.png'
import { parseJwt } from '../../utils'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/authAction'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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
      await registerSchema.validate(formData, { abortEarly: false })
      setErrors({})
      handleRegister(formData)
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

  async function handleRegister(form) {
    const { name, email, password } = form
    let data = {
      name,
      email,
      password,
    }

    dispatch(register(data, navigate))
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
          Create your account
        </h1>

        <GoogleLogin>
          <img src={googleIcon} style={{ height: '20px', objectFit: 'fit' }} />
          Sign up with Google
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
              id='name'
              type='text'
              name='name'
              placeholder='Enter name here'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.textfieldgroup}>
            <label htmlFor='email'>
              Email <span>*</span>
            </label>
            <input
              type='email'
              name='email'
              id='emal'
              placeholder='Enter email here'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.textfieldgroup}>
            <label>
              Password <span>*</span>
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <div className={styles.textfieldgroup}>
            <label>
              Confirm password <span>*</span>
            </label>
            <input
              type='password'
              id='password confirm'
              name='passwordConfirmation'
              placeholder='Confirm password'
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            {errors.passwordConfirmation && (
              <p className={styles.error}>{errors.passwordConfirmation}</p>
            )}
          </div>
          <button type='submit' className={styles.btn}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '8px' }}>
          Already have an account?{' '}
          <Link
            style={{ textDecoration: 'none', fontWeight: '600' }}
            to='/login'
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
