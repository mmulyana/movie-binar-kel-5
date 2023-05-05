import axios from 'axios'
import { toast } from 'react-toastify'

function filterImage(movie) {
  if (movie.backdrop_path !== null) {
    return movie.backdrop_path
  } else {
    return movie.poster_path
  }
}

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

    localStorage.setItem('token', token)
    console.log('success')

    toast.success('Your account has been created successfully!')

    window.location.href = '/'
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}

export { filterImage, registerLoginWithGoogleAction }
