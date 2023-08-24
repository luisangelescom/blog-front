'use client'

import useStoreLogin from '@/app/store/login'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { fetchClient } from '@/app/utils/fetchClient'
import { PostDescriptionType } from '@/app/types/post'
import { useRouter } from 'next/navigation'
import { revalidatePathCustom } from '@/app/action-server/revalidate-server'
import useStore from '../hooks/useHookStore'
import { useState } from 'react'
import { Button } from '@nextui-org/react'

interface Props {
  postId: string
  data: PostDescriptionType[]
}

function AllDescription ({ postId, data }: Props): JSX.Element {
  // const { token } = useStoreLogin()
  const { refresh } = useRouter()
  const token = useStore(useStoreLogin, (state) => state)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ description: string }>()

  const onSubmit: SubmitHandler<{ description: string }> = (data) => {
    setIsLoading(true)
    fetchClient<PostDescriptionType[]>(
      fetch(`/api/description/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ description: data.description })
      })
    )
      .then(() => {
        // setDescription(response)
        refresh()
        revalidatePathCustom('/post/[id]')
        toast.success('Success in creating the description')
        reset()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className='w-full flex flex-col gap-3'>
        <form
          // eslint-disable-next-line
          onSubmit={handleSubmit(onSubmit)}
          className='h-full gap-5 w-full flex flex-col justify-center items-center'
        >
          <div className='flex flex-col w-full gap-1'>
            <textarea
              placeholder='Description'
              className={`w-full max-h-[400px] min-h-[100px] p-2 bg-white/10 dark:bg-black/20 border-2 ${
                token?.token.accessToken === null || isLoading ? 'border-black/20 dark:border-white/20 resize-none' : ''
              } rounded-md`}
              maxLength={255}
              disabled={token?.token.accessToken === null || isLoading}
              {...register('description', { required: true })}
            />
            {errors.description?.type === 'required' && (
              <span className='text-sm text-red-500'>Description is required</span>
            )}
          </div>
          <div className='flex justify-end w-full'>
            {/* <button
              type='submit'
              className={`border-2 border-white/50 ${
                 token?.token.accessToken === null || isLoading ? ' opacity-50' : 'hover:border-blue-400 hover:text-blue-400'
              } py-1 px-4 rounded-md`}
              disabled={token?.token.accessToken === null || isLoading}
            >
              Save
            </button> */}
            <Button
              type='submit'
              color={token?.token.accessToken === null || isLoading ? 'default' : 'primary'}
              disabled={token?.token.accessToken === null || isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      {data.map(({ id, description, user }) => (
        <div
          key={id}
          className='border-2 dark:border-white/20 flex flex-col md:flex-row gap-7 md:gap-0 w-full rounded-md min-h-[100px] p-2'
        >
          <div className='w-[200px] flex flex-col'>
            <span className='text-sm font-mono text-black/90 dark:text-white/90'>Autor</span>
            <span className='px-2 font-sans font-semibold text-lg text-black/90 dark:text-white/90'>{user?.surname ?? 'anónimo'}</span>
          </div>
          <div className='flex flex-col grow'>
            <span className='text-sm font-mono text-black/90 dark:text-white/90'>Description</span>
            <span className='px-2 font-sans font-semibold text-lg text-black/90 dark:text-white/90'>{description}</span>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className='h-[300px] flex justify-center items-center'>
          <span className='text-2xl text-white/90 font-sans font-bold tracking-wide'>
            No hay descripciones en este post
          </span>
        </div>
      )}
    </>
  )
}

export default AllDescription
