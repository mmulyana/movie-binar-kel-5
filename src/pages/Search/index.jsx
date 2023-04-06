import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Search() {
  const [query, setQuery] = useState('')
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    history.push(`/search/${query}`)
  }

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search movies...'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default Search
