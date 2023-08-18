'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import useOpenModalPost from '@/app/store/openModalPost'
import { PostProps } from '@/app/types/post'
import useStorePost from '@/app/store/dashboard'

import { fetchClient } from '@/app/utils/fetchClient'
import { Post } from '@/app/types/user'
import { actionRevalidateDashboard, actionRevalidatePosts } from '@/app/action-server/revalidate-server'
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'

function ModalPost (): JSX.Element {
  const { open, setClose, postId } = useOpenModalPost()
  const { setPost, posts } = useStorePost()
  const [isLoading, onLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PostProps>()

  useEffect(() => {
    reset()
    if (postId !== undefined) {
      const post = posts?.posts?.find((v) => v.id === postId)

      setValue('title', post?.title ?? '', { shouldValidate: true })
      setValue('article', post?.article ?? '', { shouldValidate: true })
    }
    // eslint-disable-next-line
  }, [postId, posts]);

  const onSubmit: SubmitHandler<PostProps> = (data) => {
    onLoading(true)
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
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
          toast.error('Error creating the post')
        })
        .finally(() => {
          actionRevalidatePosts()
          actionRevalidateDashboard()
          onLoading(false)
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
          toast.error('Error update the post')
        })
        .finally(() => {
          actionRevalidatePosts()
          actionRevalidateDashboard()
          onLoading(false)
        })
    }
  }

  return (
    <Modal backdrop='blur' size='md' isOpen={open} onClose={setClose} placement='center'>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <span className='text-black dark:text-white text-2xl leading-6 tracking-wide'>
            {postId === undefined ? 'Create Post' : 'Edit Post'}
          </span>
        </ModalHeader>
        <Divider className='my-10 px-10' />
        <ModalBody>
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
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field }) => {
                    console.log({ field })
                    return <Input type='text' label='Title' className='text-black dark:text-white' {...field} />
                  }}
                />

                {errors.title?.type === 'required' && <span className='text-sm text-red-500'>Name is required</span>}
              </div>
              <div className='flex flex-col w-full gap-1'>
                <Controller
                  name='article'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field }) =>
                    <Textarea
                      label='Description'
                      labelPlacement='outside'
                      placeholder='Enter your description'
                      className='max-h-[300px] min-h-[100px] text-black dark:text-white'
                      maxLength={255} {...field}
                    />}
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
            <ModalFooter>
              <Button color='danger' variant='light' onClick={setClose} disabled={isLoading}>
                Close
              </Button>
              <Button type='submit' color='primary' isLoading={isLoading}>
                {postId === undefined ? 'Save' : 'Edit'}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalPost
