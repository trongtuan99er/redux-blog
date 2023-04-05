import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getBlogPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]

          return final
        }
        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),
    getBlogPost: builder.query<Post, String>({
      query: (postId) => `posts/${postId}`
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      invalidatesTags: (result, err, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query: ({ id, body }) => {
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body
        }
      },
      invalidatesTags: (result, err, body) => [{ type: 'Posts', id: body.id }]
    }),
    deletePost: builder.mutation<{}, string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, err, id) => [{ type: 'Posts', id }]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi
