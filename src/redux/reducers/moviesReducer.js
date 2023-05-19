import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRequestURL } from '../../utils/requests'

const initialState = {
  data: [],
  popular: [],
  detail: null,
  isLoading: true,
  isLoadingPopular: true,
  err: false,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const res = await axios(getRequestURL('upcoming'))
  return res.data.results
})

export const fetchMoviesPopular = createAsyncThunk('movies/fetchMoviesPopular', async () => {
    const res = await axios(getRequestURL('popular'))
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
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
  },
})

export const { setMovie } = moviesReducer.actions
export default moviesReducer.reducer
