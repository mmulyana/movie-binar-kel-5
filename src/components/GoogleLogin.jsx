import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils'
import { useDispatch } from 'react-redux'
import { registerLoginWithGoogle } from '../redux/actions/authAction'

function GoogleLogin({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registerLoginWithGoogleAction = async (accessToken) => {
    dispatch(registerLoginWithGoogle(accessToken, navigate))
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      registerLoginWithGoogleAction(responseGoogle.access_token)
    },
  })

  return (
    <button style={styleBtn} onClick={loginWithGoogle}>
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
