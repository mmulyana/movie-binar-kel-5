import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
export default useFetch
