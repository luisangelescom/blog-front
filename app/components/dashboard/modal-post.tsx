'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import useOpenModalPost from '@/app/store/openModalPost'
import { PostProps } from '@/app/types/post'
import useStorePost from '@/app/store/dashboard'

import { fetchClient } from '@/app/utils/fetchClient'
import { Post } from '@/app/types/user'

function ModalPost (): JSX.Element {
  const { open, setClose, postId } = useOpenModalPost()
  const { setPost, posts } = useStorePost()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PostProps>()

  useEffect(() => {
    reset()
    if (postId !== undefined) {
      const post = posts?.posts?.find((v) => v.id === postId)
      setValue('title', post?.title ?? '')
      setValue('article', post?.article ?? '')
    }
    // eslint-disable-next-line
  }, [postId, posts]);

  const onSubmit: SubmitHandler<PostProps> = (data) => {
    if (postId === undefined) {
      fetchClient<Post[]>(
        fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify(data)
        })
      )
        .then((response) => {
          setPost(posts !== null ? { ...posts, posts: response } : null)
          setClose()
          toast.success('Success in creating the post')
          // revalidateTag('a')
          // revalidatePath('/')
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
          toast.success('Error creating the post')
        })
    } else {
      fetchClient<Post[]>(
        fetch(`/api/post/${postId}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
        })
      )
        .then((response) => {
          setPost(posts !== null ? { ...posts, posts: response } : null)
          setClose()
          toast.success('Success in update the post')
          // revalidateTag('a')
          // revalidatePath('/')
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
          toast.success('Error update the post')
        })
    }
  }

  return (
    <main
      onClick={setClose}
      className={`fixed top-0 bottom-0 right-0 left-0 w-full z-10 bg-black/70 drop-shadow-md ${
        open ? 'translate-x-0' : 'translate-x-full'
      } transition-all duration-500`}
    >
      <section
        onClick={(event) => {
          event.stopPropagation()
        }}
        className='absolute top-0 bottom-0 max-w-[420px] bg-black right-0 w-full'
      >
        <form
          // eslint-disable-next-line
          onSubmit={handleSubmit(onSubmit)}
          className='h-full border-2 border-white/40 rounded-lg gap-5 w-full flex flex-col justify-center items-center p-6'
        >
          <span className='text-2xl font-sans font-bold tracking-tight'>
            {postId === undefined ? 'Create Post' : 'Edit Post'}
          </span>
          <div className='h-4/6 w-full flex flex-col gap-5 justify-center items-center'>
            <div className='flex flex-col w-full gap-1'>
              <input
                type='text'
                placeholder='Title'
                className='text-black h-10 rounded-lg px-2 w-full'
                {...register('title', { required: true })}
                maxLength={50}
              />
              {errors.title?.type === 'required' && <span className='text-sm text-red-500'>Name is required</span>}
            </div>
            <div className='flex flex-col w-full gap-1'>
              <textarea
                placeholder='Article'
                className='text-black h-10 rounded-lg p-2 w-full max-h-[300px] min-h-[100px]'
                {...register('article', { required: true })}
                maxLength={255}
              />
              {errors.article?.type === 'required' && (
                <span className='text-sm text-red-500'>Lastname is required</span>
              )}
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <button
              type='submit'
              className='border-2 border-white/50 rounded-lg py-3 px-6 text-md hover:text-blue-500 '
            >
              {postId === undefined ? 'Save' : 'Edit'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default ModalPost
