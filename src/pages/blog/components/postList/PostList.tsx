import PostItem from '../postItem'
import { useSelector, useDispatch } from 'react-redux'
import { startEditingPost } from 'pages/blog/Blog.slice'
import { useDeletePostMutation, useGetBlogPostsQuery } from 'pages/blog/blog.service'
import SkeletonPost from '../SkeletonPost'

export default function PostList() {
  // const postList = useSelector((state: RootState) => state.blog.PostList)
  const { data, isLoading, isFetching } = useGetBlogPostsQuery()
  const [deletePost] = useDeletePostMutation()
  const dispatch = useDispatch()

  const handleDeletePost = (postId: string) => {
    deletePost(postId)
  }
  const handleStartEditingPost = (postId: string) => {
    dispatch(startEditingPost(postId))
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-6 md:mb-8'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Redux blog list</h2>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {isFetching ? (
            <>
              <SkeletonPost />
              <SkeletonPost />
            </>
          ) : (
            data?.map((post) => (
              <PostItem
                post={post}
                key={post.id}
                handleDeletePost={handleDeletePost}
                handleStartEditingPost={handleStartEditingPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
