import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRequestURL } from '../../utils/requests'

const initialState = {
  data: [],
  popular: [],
  detail: null,
  reviews: [],
  recomendation: [],
  isLoading: true,
  isLoadingDetail: true,
  isLoadingPopular: true,
  err: false,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const res = await axios(getRequestURL('upcoming'))
  return res.data.results
})

export const fetchMoviesPopular = createAsyncThunk(
  'movies/fetchMoviesPopular',
  async () => {
    const res = await axios(getRequestURL('popular'))
    return res.data.results
  },
)

export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (id) => {
    const res = await axios(getRequestURL('detail', id))
    return res.data
  },
)

export const fetchReview = createAsyncThunk(
  'movies/fetchReview',
  async (id) => {
    const res = await axios(getRequestURL('review', id))
    return res.data.results
  },
)

export const fetchRecomendation = createAsyncThunk(
  'movies/fetchRecomendation',
  async (id) => {
    const res = await axios(getRequestURL('recommendations', id))
    return res.data.results
  },
)

const moviesReducer = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovie: (state) => {
      state.detail = action.payload
    },
    removeMovie: (state) => {
      state.detail = null
      state.recomendation = []
      state.reviews = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchMovies.rejected, (state) => {
      state.data = []
      state.isLoading = false
      state.err = true
    })

    builder.addCase(fetchMoviesPopular.pending, (state) => {
      state.isLoadingPopular = true
    })
    builder.addCase(fetchMoviesPopular.fulfilled, (state, action) => {
      state.popular = action.payload
      state.isLoadingPopular = false
    })
    builder.addCase(fetchMoviesPopular.rejected, (state) => {
      state.popular = []
      state.isLoadingPopular = false
    })

    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.isLoadingDetail = true
    })
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detail = action.payload
      state.isLoadingDetail = false
    })
    builder.addCase(fetchMovieDetail.rejected, (state) => {
      state.popular = []
      state.isLoadingDetail = false
    })

    builder.addCase(fetchReview.fulfilled, (state, action) => {
      state.reviews = action.payload
    })

    builder.addCase(fetchRecomendation.fulfilled, (state, action) => {
      state.recomendation = action.payload
    })
  },
})

export const { setMovie, removeMovie } = moviesReducer.actions
export default moviesReducer.reducer
