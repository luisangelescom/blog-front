'use client'

import { PostLikeType, PostProps } from '@/app/types/post'
import { HeartIcon } from '../icons'
import { addLikePost } from '@/app/services/User/UserPostsService'
import useStoreLogin from '@/app/store/login'
import useStore from '../hooks/useHookStore'
import { Button, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { fetchSWR } from '@/app/utils/fetchClient'

interface Props {
  postId: string
  post: PostProps
  // likes: PostLikeType
}

function HeaderPost ({ postId, post }: Props): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state)
  const [isLoadingLike, setLike] = useState(false)
  const { data: likes, isLoading, isValidating } = useSWR(`/api/post/${postId}/likes`, fetchSWR<PostLikeType>)
  const { mutate } = useSWRConfig()

  const addLike = (): void => {
    if (token?.token.accessToken === null || isLoadingLike) {
      return
    }
    setLike(true)
    addLikePost(token?.token.accessToken ?? '', postId)
      .then(async (r) => await r.json())
      .then(async (r) => {
        console.log(r)
        await mutate(`/api/post/${postId}/likes`, r)
      })
      .catch(() => {
      })
      .finally(() => {
        // revalidatePathCustom('/post/[id]')

        setLike(false)
      })
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-2 justify-center items-end'>
        <Tooltip
          placement='bottom'
          size='lg'
          content={
            <div className='px-1 py-2'>
              {isLoading || isValidating
                ? (
                  <>Cargando</>
                  )
                : likes == null && likes === undefined
                  ? (
                    <>Error al obtener los likes</>
                    )
                  : (
                    <>
                      {likes.rows.map(({ id, user }) => (
                        <div key={id} className='text-small font-bold text-black'>
                          {user?.surname ?? 'Anónimo'}
                        </div>
                      ))}
                      {likes.count === 0 && <div className='text-small font-bold text-black'>No comments yet</div>}
                    </>
                    )}
            </div>
          }
        >
          <Button
            variant='light'
            size='sm'
            color='primary'
            onPress={addLike}
            radius='sm'
            // isDisabled={token?.token.accessToken === null || isLoadingLike}
            isIconOnly
            translate='yes'
            className='flex justify-center items-center'
          >
            {(isLoading || isValidating) && <>Cargando</>}
            <HeartIcon
              className={`hover:fill-red-400 ${
                likes !== null &&
                likes !== undefined &&
                likes.rows.length > 0 &&
                likes.rows.some(({ user }) => user?.surname === token?.token.data?.surname)
                  ? 'fill-red-500'
                  : ''
              }`}
              select={
                likes !== null &&
                likes !== undefined &&
                likes.rows.length > 0 &&
                likes.rows.some(({ user }) => user?.surname === token?.token.data?.surname)
              }
            />
          </Button>
        </Tooltip>
        {/* <button className='absolute top-0 right-0' onClick={addLike} disabled={token?.token.accessToken === null}>
          <HeartIcon />
        </button> */}
      </div>

      <section className='w-full flex flex-col border-b-2 border-black/10 dark:border-white/10'>
        <article className='w-full flex justify-start items-center'>
          <span className='tex-2xl md:text-4xl text-blue-400 font-sans font-medium tracking-wider'>{post.title}</span>
        </article>

        <article className='w-full flex justify-start items-center my-5'>
          <span className='text-md md:text-2xl text-black/80 dark:text-[#EEEEEE] font-sans font-medium tracking-wider'>
            {post.article}
          </span>
        </article>
      </section>
    </div>
  )
}

export default HeaderPost
