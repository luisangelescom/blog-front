'use client'

import useStoreLogin from '@/app/store/login'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addCommentsPost, allDescriptionPost } from '@/app/services/User/UserPostsService'
import { toast } from 'react-toastify'

import useStore from '../hooks/useHookStore'
import { useCallback, useEffect } from 'react'
import useDescriptionPost from '@/app/store/description'

interface Props {
  postId: string
}

function AllDescription ({ postId }: Props): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state)
  const { descriptions: description, setDescription } = useDescriptionPost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ description: string }>()

  const allDescription = useCallback(() => {
    console.log('Exec')
    allDescriptionPost(postId).then(async (json) => {
      if (json.ok) { return await json.json() }
      if (json.status === 401) {
        token?.setToken(null)
        throw new Error('Unauthorize')
      }
      throw new Error('No se pudo crear')
    })
      .then((response) => {
        // setPost(response)
        setDescription(response)
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    allDescription()
  }, [])

  const onSubmit: SubmitHandler<{ description: string }> = (data) => {
    addCommentsPost(token?.accessToken?.toString() ?? '', +postId, data.description)
      .then(async (json) => {
        if (json.ok) {
          return await json.json()
        }
        if (json.status === 401) {
          token?.setToken(null)
          toast.error('Se expiro tu token')
          throw new Error('Unauthorize')
        }
        toast.error('Hubo un error la crear tu post')
        throw new Error('No se pudo crear')
      }).then((data) => {
        setDescription(data)
        toast.success('Success in creating the description')
        reset()
      })
      .catch((e) => {
        console.log(e)
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
              title={token?.accessToken === null ? 'You need to be a user to post' : 'Crear post'}
              placeholder='Description'
              className={`w-full max-h-[400px] min-h-[100px] p-2 bg-black/20 border-2 ${
            token?.accessToken === null ? 'border-white/20 resize-none' : ''
          } rounded-md`}
              maxLength={255}
              disabled={token?.accessToken === null}
              {...register('description', { required: true })}
            />
            {errors.description?.type === 'required' && <span className='text-sm text-red-500'>Description is required</span>}
          </div>
          <div
            className='flex justify-end w-full'
            title={token?.accessToken === null ? 'You need to be a user to post' : 'Guardar'}
          >
            <button
              type='submit'
              className={`border-2 border-white/50 ${
              token?.accessToken !== null ? 'hover:border-blue-400 hover:text-blue-400' : ' opacity-50'
            } py-1 px-4 rounded-md`}
              disabled={token?.accessToken === null}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {description.map(({ id, description, user: { surname } }) => (
        <div key={id} className='border-2 border-white/20 flex w-full rounded-md min-h-[100px] p-2'>
          <div className='w-[200px] flex flex-col'>
            <span className='text-sm font-mono'>Autor</span>
            <span className='px-2 font-sans font-semibold text-lg text-white/80'>{surname}</span>
          </div>
          <div className='flex flex-col grow'>
            <span className='text-sm font-mono'>Description</span>
            <span className='px-2 font-sans font-semibold text-lg text-white/90'>{description}</span>
          </div>
        </div>
      ))}

      {description.length === 0 && (
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
