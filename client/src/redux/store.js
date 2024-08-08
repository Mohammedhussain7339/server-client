import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counter/counterslices'
import incDecrement from './slices/counter/incDecrement'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    incDec: incDecrement,

  },
})