import { createAction, createReducer, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Post } from 'types/blog.type'
import { initalPostList } from './contants'

interface BlogState {
  postId: string
}

const initialState: BlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditingPost: (state) => {
      state.postId = ''
    }
  }
})

// interface BlogState {
//   PostList: Post[]
//   EditingPost: Post | null
// }

// const initialState: BlogState = {
//   PostList: [],
//   EditingPost: null
// }

// const blogSlice = createSlice({
//   name: 'blog',
//   initialState: initialState,
//   reducers: {
//     addPost: {
//       reducer: (state, action: PayloadAction<Post>) => {
//         state.PostList.push(action.payload)
//       },
//       prepare: function (post: Omit<Post, 'id'>) {
//         return {
//           payload: {
//             ...post,
//             id: nanoid()
//           }
//         }
//       }
//     },
//     deletePost: (state, action: PayloadAction<string>) => {
//       const postId = action.payload
//       const foundPostId = state.PostList.findIndex((post) => post.id === postId)
//       if (foundPostId !== -1) {
//         state.PostList.splice(foundPostId, 1)
//       }
//     },
//     startEditingPost: (state, action: PayloadAction<string>) => {
//       const postId = action.payload
//       const foundPost = state.PostList.find((post) => post.id === postId)
//       if (foundPost) state.EditingPost = foundPost || null
//     },
//     canelEditingPost: (state) => {
//       state.EditingPost = null
//     },
//     updatePost: (state, action: PayloadAction<Post>) => {
//       const postId = action.payload.id
//       state.PostList.some((post, index) => {
//         if (post.id === postId) {
//           state.PostList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.EditingPost = null
//     }
//   }
// })

// export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
//   return {
//     payload: {
//       ...post,
//       id: nanoid()
//     }
//   }
// })
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditingPost = createAction<string>('blog/startEditingPost')
// export const canelEditingPost = createAction('blog/canelEditingPost')
// export const updatePost = createAction<Post>('blog/updatePost')

// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       state.PostList.push(action.payload)
//     })
//     .addCase(deletePost, (state, action) => {
//       const postId = action.payload
//       const foundPostId = state.PostList.findIndex((post) => post.id === postId)
//       if (foundPostId !== -1) {
//         state.PostList.splice(foundPostId, 1)
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const postId = action.payload
//       const foundPost = state.PostList.find((post) => post.id === postId)
//       if (foundPost) state.EditingPost = foundPost || null
//     })
//     .addCase(canelEditingPost, (state) => {
//       state.EditingPost = null
//     })
//     .addCase(updatePost, (state, action) => {
//       const postId = action.payload.id
//       state.PostList.some((post, index) => {
//         if (post.id === postId) {
//           state.PostList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.EditingPost = null
//     })
//     .addDefaultCase((state, action) => {})
// })
export const { startEditingPost, cancelEditingPost } = blogSlice.actions
export default blogSlice.reducer
