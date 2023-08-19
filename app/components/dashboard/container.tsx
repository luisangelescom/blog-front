'use client'

import useStoreLogin from '@/app/store/login'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import useStorePost from '@/app/store/dashboard'

import AllPost from './all-post'
import ModalPost from './modal-post'
import useOpenModalPost from '@/app/store/openModalPost'
import { UserPostData } from '@/app/types/user'

interface Props {
  posts: UserPostData
}

function ContainerDashboard ({ posts }: Props): JSX.Element {
  const { token, preload, loading: isLoading } = useStoreLogin()
  const { setPost } = useStorePost()
  const { setOpen } = useOpenModalPost()

  const { replace } = useRouter()

  useEffect(() => {
    if (posts !== null) { setPost(posts) }
  // eslint-disable-next-line
  }, [posts])

  useEffect(() => {
    if (!preload) {
      if (token.accessToken === null) {
        replace('/login')
      }
    }
    return () => {
      // setPost(null)
    }
    // eslint-disable-next-line
  }, [token, replace, preload]);

  if (posts === null) {
    return (
      <div>
        <span>Enter</span>
        <span>Error chaval</span>
      </div>
    )
  }

  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <section className='w-full flex justify-center items-center h-28'>
        <span className='text-2xl uppercase font-sans font-bold tracking-wider text-blue-400'>All your posts</span>
      </section>
      <section className='flex justify-end items-center px-2 h-12'>
        <button
          title='create post'
          type='button'
          className={`border-2 border-white/70 rounded-md ${isLoading ? '' : 'hover:border-blue-400 hover:text-blue-400'} py-1 px-4`}
          disabled={isLoading}
          onClick={() => {
            setOpen()
          }}
        >
          Create Post
        </button>
      </section>
      <AllPost data={posts.posts} />
      {/* <section>{loading || isLoading ? <LoadingPost /> : <AllPost data={posts?.posts} />}</section> */}
      <ModalPost />
    </main>
  )
}

export default ContainerDashboard
