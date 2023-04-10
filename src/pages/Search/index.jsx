import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Search() {
  const { search } = useParams()
  return (
    <div style={{ paddingTop: `80px` }}>
      <h1>Search Movies</h1>
      {search}
    </div>
  )
}

export default Search
