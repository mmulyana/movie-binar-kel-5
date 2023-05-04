import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema } from '../../utils/schema'

export default function Login() {
  const navigate = useNavigate()
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
      const { email, password } = form
      let data = {
        email,
        password,
      }

      let config = {
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/v1/auth/login`,
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className='error'>{errors.email}</p>}
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className='error'>{errors.password}</p>}

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
