import React, { useState } from 'react'

import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().email('Email is required').required('email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
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
      await schema.validate(formData, { abortEarly: false })
      setErrors({})
      console.log(formData)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className='error'>{errors.name}</p>}
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
        <input
          type='password'
          name='passwordConfirmation'
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        {errors.passwordConfirmation && <p className='error'>{errors.passwordConfirmation}</p>}
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
