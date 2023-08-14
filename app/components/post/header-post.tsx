'use client'

import { PostProps } from '@/app/types/post'
import { HeartIcon } from '../icons'
import { addLikePost } from '@/app/services/User/UserPostsService'
import useStore from '../hooks/useHookStore'
import useStoreLogin from '@/app/store/login'
import { toast } from 'react-toastify'

interface Props extends PostProps {
  postId: string
}

function HeaderPost ({ title, article, postId }: Props): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state)

  const addLike = (): void => {
    addLikePost(token?.accessToken?.toString() ?? '', postId)
      .then(async (json) => {
        console.log(json.status)

        if (json.ok) { return await json.json() }
        if (json.status === 401) {
          token?.setToken(null)
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

  return (
    <div className='relative'>
      {token?.accessToken !== null &&
        <div className='flex flex-col gap-2'>
          <button className='absolute top-0 right-0' onClick={addLike}>
            <HeartIcon />
          </button>
        </div>}
      <section className='w-full flex flex-col border-b-2 border-white/10'>
        <article className='w-full h-28 flex justify-start items-center'>
          <span className='text-4xl text-blue-400 font-sans font-medium tracking-wider'>{title}</span>
        </article>

        <article className='w-full h-28 flex justify-start items-center'>
          <span className='text-2xl text-[#EEEEEE] font-sans font-medium tracking-wider'>{article}</span>
        </article>
      </section>
    </div>
  )
}

export default HeaderPost
