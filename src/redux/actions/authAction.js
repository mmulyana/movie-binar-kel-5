import { setIsLoggedIn, setToken, setUser } from '../reducers/authReducer'
import axios from 'axios'
import { toast } from 'react-toastify'

export const registerLoginWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_APP_URL}/v1/auth/google`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const response = await axios.request(config)
      const { token } = response.data.data

      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))

      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
    }
  }

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null))
    dispatch(setIsLoggedIn(false))
    dispatch(setUser(null))

    if (navigate) navigate('/')
  } catch (error) {
    toast.error(error?.message)
  }
}

export const getMe = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth

    if (!token) {
      console.log('token gak ada')
      return
    }

    const config = {
      method: 'get',
      url: `${import.meta.env.VITE_APP_URL}/v1/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.request(config)
    
    dispatch(setUser(response.data.data))
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        dispatch(logout(null))
        return false
      }

      toast.error(error.response.data.message)
      return false
    }
    toast.error(error.message)
  }
}

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: 'post',
      url: `${import.meta.env.VITE_APP_URL}/v1/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    const response = await axios.request(config)
    const { token } = response.data.data

    dispatch(setToken(token))
    dispatch(setIsLoggedIn(true))

    navigate('/')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}

export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: 'post',
      url: `${import.meta.env.VITE_APP_URL}/v1/auth/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    const response = await axios.request(config)
    const { token } = response.data.data

    dispatch(setToken(token))
    dispatch(setIsLoggedIn(true))

    navigate('/')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}
