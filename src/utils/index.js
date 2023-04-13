function filterImage(movie) {
  if (movie.backdrop_path !== null) {
    return movie.backdrop_path
  } else {
    return movie.poster_path
  }
}

export { filterImage }
