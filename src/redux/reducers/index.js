import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import moviesReducer from './moviesReducer'

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
})
