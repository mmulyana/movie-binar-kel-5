import React, { useState } from 'react'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { value, name } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
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
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
