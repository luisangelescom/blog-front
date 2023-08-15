'use client'

import { PostProps } from '@/app/types/post'
import { HeartIcon } from '../icons'
import { addLikePost } from '@/app/services/User/UserPostsService'
import useStoreLogin from '@/app/store/login'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { fetchSWR } from '@/app/utils/fetchClient'
import Loading from '@/app/post/[id]/loading'

interface Props {
  postId: string
}

function HeaderPost ({ postId }: Props): JSX.Element {
  const { token } = useStoreLogin()

  const {
    data,
    isLoading,
    isValidating
  } = useSWR(`/api/post/${postId}`, fetchSWR<PostProps>)

  const addLike = (): void => {
    addLikePost(token.accessToken ?? '', postId)
      .then(async (json) => {
        console.log(json.status)

        if (json.ok) {
          return await json.json()
        }
        if (json.status === 401) {
          // token?.setToken(null)
          toast.error('Se expiro tu token')
          throw new Error('Unauthorize')
        }
        toast.error('Hubo un error la crear tu post')
        throw new Error('No se pudo crear')
      })
      .then((response) => {
        console.log('response')
        console.log(response)

        toast.success('The like has been added to the post')
      })
      .catch(() => {
        console.log('Error')
      })
  }

  if (isLoading || isValidating) {
    return <Loading />
  }

  return (
    <div className='relative'>
      {token?.accessToken !== null && (
        <div className='flex flex-col gap-2'>
          <button className='absolute top-0 right-0' onClick={addLike}>
            <HeartIcon />
          </button>
        </div>
      )}
      <section className='w-full flex flex-col border-b-2 border-white/10'>
        <article className='w-full h-28 flex justify-start items-center'>
          <span className='text-4xl text-blue-400 font-sans font-medium tracking-wider'>{data?.title ?? ''}</span>
        </article>

        <article className='w-full h-28 flex justify-start items-center'>
          <span className='text-2xl text-[#EEEEEE] font-sans font-medium tracking-wider'>{data?.article ?? ''}</span>
        </article>
      </section>
    </div>
  )
}

export default HeaderPost
