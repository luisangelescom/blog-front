'use client' // Error components must be Client Components

import { Button } from '@nextui-org/react'
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
    <main className='container mx-auto border-2 w-full min-h-[calc(100vh-75px)] flex flex-col justify-center items-center'>
      <h2 className='text-2xl'>Ooops... Parece que algo salio mal.</h2>
      <Button
        type='button'
        variant='shadow'
        color='danger'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset()
            // router.refresh()
          }
        }
      >
        Refresh
      </Button>
    </main>
  )
}
