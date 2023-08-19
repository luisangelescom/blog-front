'use client' // Error components must be Client Components

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { deleteCookie } from '../utils/cookies-custom'
import useStoreLogin from '../store/login'
// import { deleteCookie } from './utils/cookies-custom'

export default function GlobalError ({ error, reset }: { error: Error, reset: () => void }): JSX.Element {
  const { replace } = useRouter()
  const { deleteToken } = useStoreLogin()

  const unauthorize = (): void => {
    deleteToken()
    deleteCookie('token')
    replace('/login')
  }

  useEffect(() => {
    if (error.message === 'Unauthorize') {
      unauthorize()
    }
  // eslint-disable-next-line
  }, [error])

  return (
    <main className='container mx-auto px-0 flex flex-col gap-5'>
      <h2>Ooops... Parece que algo salio mal en el dashboard.</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset()

            // router.refresh()
          }
        }
      >Refresh
      </button>
    </main>
  )
}
