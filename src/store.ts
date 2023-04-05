import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import blogSlice from 'pages/blog/Blog.slice'
import { blogApi } from 'pages/blog/blog.service'

export const store = configureStore({
  reducer: {
    blog: blogSlice,
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

setupListeners(store.dispatch)

// Lấy RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
