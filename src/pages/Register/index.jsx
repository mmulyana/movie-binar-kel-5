import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerSchema } from '../../utils/schema'
import { registerLoginWithGoogleAction } from '../../utils'
import GoogleLogin from '../../components/GoogleLogin'
import styles from './index.module.css'
import AuthLayout from '../../components/Layout/AuthLayout'
import googleIcon from '../../assets/images/google.png'

export default function Register() {
  const navigate = useNavigate()
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

  function responseGoogle(response) {
    console.log(response)
    registerLoginWithGoogleAction(response.credential)
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
    try {
      const { name, email, password } = form
      let data = {
        name,
        email,
        password,
      }

      let config = {
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/v1/auth/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const response = await axios.request(config)
      const { token } = response.data.data

      localStorage.setItem('token', token)
      toast.success('Your account has been created successfully!')

      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
    }
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
          Sign in with Google
        </GoogleLogin>

        <div style={{ position: 'relative' }}>
          <hr style={{ color: '#878484' }} />
          <div
            style={{
              width: '30px',
              height: '40px',
              background: '#f5f5f5',
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
              id='password'
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
            Register
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
