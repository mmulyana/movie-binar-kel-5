import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function GoogleLogin({ children }) {
  const navigate = useNavigate()
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/v1/auth/google`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const response = await axios.request(config)
      const { token } = response.data.data
      console.log(token)

      localStorage.setItem('token', token)
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      registerLoginWithGoogleAction(responseGoogle.access_token)
    },
  })

  return (
    <button style={styleBtn} onClick={() => loginWithGoogle()}>
      {children}
    </button>
  )
}

export default GoogleLogin

const styleBtn = {
  borderRadius: '80px',
  height: '44px',
  width: '100%',
  border: '1px solid #9e9e9e',
  background: '#fff',
  fontSize: '14px',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
}
