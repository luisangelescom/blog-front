'use client'

import useStoreLogin from '@/app/store/login'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import useStorePost from '@/app/store/dashboard'

import useStore from '../hooks/useHookStore'
import AllPost from './all-post'
import ModalPost from './modal-post'
import useOpenModalPost from '@/app/store/openModalPost'
import { fetchClient } from '@/app/utils/fetchClient'
import { UserPostData } from '@/app/types/user'
import LoadingPost from './loading-post'

function ContainerDashboard (): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state)
  const { posts, setPost, loading, setLoadingPost } = useStorePost()
  const { setOpen } = useOpenModalPost()

  const { replace } = useRouter()

  const getPost = useCallback(() => {
    if (token?.token?.accessToken !== undefined && token?.token?.accessToken !== null) {
      // allUserPosts(token?.token.accessToken.toString())
      //   .then(async (json) => await json.json())
      //   .then(data => {
      //     console.log(data)

      //     storePosts?.setPost(data)
      //   }).catch((r) => {})
      setLoadingPost(true)
      fetchClient<UserPostData>(fetch('/api/user')).then(response => {
        setPost(response)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoadingPost(false)
      })
    }
  // eslint-disable-next-line
  }, [token?.token])

  useEffect(() => {
    if (token?.token?.accessToken === null) {
      replace('/login')
    } else {
      getPost()
    }
    return () => {
      setPost(null)
    }
  // eslint-disable-next-line
  }, [token?.token, replace])

  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <section className='flex justify-end items-center px-2 h-16'>
        <button
          onClick={() => {
            token?.deleteToken()
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
          }}
        >
          Create Post
        </button>
      </section>
      <section>
        {loading
          ? <LoadingPost />
          : <AllPost data={posts?.posts} />}
      </section>
      <ModalPost />
    </main>
  )
}

export default ContainerDashboard
