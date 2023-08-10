'use client'

import useStoreLogin from '@/app/store/login'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import useStorePost from '@/app/store/dashboard'
import { allUserPosts } from '@/app/services/User/UserPostsService'

import useStore from '../hooks/useHookStore'
import AllPost from './all-post'
import ModalPost from './modal-post'
import useOpenModalPost from '@/app/store/openModalPost'

function ContainerDashboard (): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state)
  const storePosts = useStore(useStorePost, (state) => state)
  const { setOpen } = useOpenModalPost()

  const { replace } = useRouter()

  const getPost = useCallback(() => {
    if (token?.accessToken !== undefined && token?.accessToken !== null) {
      console.log('Veces')

      allUserPosts(token?.accessToken.toString())
        .then(async (json) => await json.json())
        .then(data => {
          console.log('data')
          console.log(data)
          storePosts?.setPost(data)
        }).catch((r) => {})
    }
  // eslint-disable-next-line
  }, [token?.accessToken])

  useEffect(() => {
    if (token?.accessToken === null) {
      replace('/login')
    } else {
      getPost()
    }
  // eslint-disable-next-line
  }, [token?.accessToken, replace])

  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <section className='flex justify-end items-center px-2 h-16'>
        <button
          onClick={() => {
            token?.setToken(null)
          }} title='logout' type='button' className='border-2 border-white/70 rounded-md hover:border-red-400 hover:text-red-400 py-1 px-4'
        >Logout
        </button>
      </section>
      <section className='w-full flex justify-center items-center h-28'>
        <span className='text-2xl uppercase font-sans font-bold tracking-wider text-blue-400'>All your posts</span>
      </section>
      <section className='flex justify-end items-center px-2 h-12'>
        <button
          title='create post' type='button' className='border-2 border-white/70 rounded-md hover:border-blue-400 hover:text-blue-400 py-1 px-4' onClick={() => {
            setOpen()
            replace('/login')
          }}
        >Create Post
        </button>
      </section>
      <section>
        <AllPost data={storePosts?.posts} />
      </section>
      <ModalPost />
    </main>
  )
}

export default ContainerDashboard
