'use client' // Error components must be Client Components

import { useEffect } from 'react'
// import { deleteCookie } from './utils/cookies-custom'

export default function GlobalError ({ error, reset }: { error: Error, reset: () => void }): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service

    if (error.message === 'Unauthorize') {
      // deleteCookie('token')
      // router.refresh()
    }
  }, [error])

  return (
    <main className='container mx-auto px-0 flex flex-col gap-5'>
      <h2>Ooops... Parece que algo salio mal.</h2>
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
