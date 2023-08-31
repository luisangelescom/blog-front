'use client'

import { Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

function NotFoundCustom (): JSX.Element {
  const { push } = useRouter()

  return (
    <div className='min-h-[calc(100vh-60px)] w-full flex flex-col justify-center items-center gap-5'>
      <Image
        src='https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp'
        alt='not-found'
        width={800}
        height={800}
      />
      <Button
        onPress={() => {
          push('/')
        }}
        size='lg'
        color='danger'
      >
        GO HOME
      </Button>
    </div>
  )
}

export default NotFoundCustom
