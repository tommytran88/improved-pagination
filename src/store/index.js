import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './searchSlice'
import wishlistSlice from './wishlistSlice'

export const store = configureStore({
  reducer: {
    search:searchSlice,
    wishlist:wishlistSlice
  },
})