import { useEffect, useState } from 'react'
import { Post } from 'types/blog.type'
import { useDispatch, useSelector } from 'react-redux'
import { cancelEditingPost } from 'pages/blog/Blog.slice'
import { RootState } from 'store'
import { useAddPostMutation, useGetBlogPostQuery, useUpdatePostMutation } from 'pages/blog/blog.service'

const initFormData: Omit<Post, 'id'> = {
  desc: '',
  title: '',
  imgUrl: '',
  publicDate: '',
  public: true
}
export default function CreatePost() {
  const [formData, setFormData] = useState<Omit<Post, 'id'>>(initFormData)
  const [addPost, addPostResult] = useAddPostMutation()
  const [updatePost, updatePostResult] = useUpdatePostMutation()
  const { status } = addPostResult

  const dispatch = useDispatch()
  const EditingPostId = useSelector((state: RootState) => state.blog.postId)
  const { data } = useGetBlogPostQuery(EditingPostId, { skip: !EditingPostId })

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (EditingPostId) {
        await updatePost({
          body: formData as Post,
          id: EditingPostId
        }).then(() => dispatch(cancelEditingPost()))
      } else {
        await addPost(formData).unwrap()
      }
      setFormData(initFormData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelEditPost = () => {
    dispatch(cancelEditingPost())
    setFormData(initFormData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='mb-2 text-center text-2xl font-bold text-gray-800 md:mb-3 lg:text-3xl'>Form</h2>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Featured Image
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          required
          value={formData.imgUrl}
          onChange={(e) => setFormData((prev) => ({ ...prev, imgUrl: e.target.value }))}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            required
            value={formData.desc}
            onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.publicDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, publicDate: e.target.value }))}
        />
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={formData.public}
          onChange={(e) => setFormData((prev) => ({ ...prev, public: e.target.checked }))}
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      {status === 'pending' && <p style={{ color: 'blue', margin: '12px 0px' }}>Dang tao post</p>}
      {status === 'fulfilled' && <p style={{ color: 'green', margin: '12px 0px' }}>Tao post thanh cong</p>}
      {status === 'rejected' && <p style={{ color: 'red', margin: '12px 0px' }}>Tao post that bai</p>}
      <div>
        {Boolean(EditingPostId) ? (
          <>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span
                className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'
                onClick={handleCancelEditPost}
              >
                Cancel
              </span>
            </button>
          </>
        ) : (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Publish Post
            </span>
          </button>
        )}
      </div>
    </form>
  )
}
