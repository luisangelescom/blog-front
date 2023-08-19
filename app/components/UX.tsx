'use client'

import { useRouter } from 'next/navigation'

import { PostType } from '../types/post'
import { Card, CardHeader, Image, CardFooter } from '@nextui-org/react'

interface Props {
  data: PostType[]
}

function UXTest ({ data }: Props): JSX.Element {
  const { push } = useRouter()

  return (
    <>

      <article className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5'>
        {data.map(({ id, title, article, user: { surname } }) => (
          <Card
            key={id} isPressable onClick={() => {
              push(`/post/${id}`)
            }} isFooterBlurred className='w-full h-[300px]' radius='sm'
          >
            <CardHeader className='absolute z-10 top-1 flex-col items-start w-full rounded-sm'>
              <p title={title} className='text-lg leading-2 text-black/80 uppercase font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis'>{title}</p>
            </CardHeader>
            <Image
              removeWrapper
              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='https://img.freepik.com/vector-gratis/concepto-pagina-destino-proceso-diseno_52683-27124.jpg'
            />
            <CardFooter className='absolute bg-white/20 dark:bg-black/40 bottom-0 rounded-b-sm'>
              <div className='flex flex-grow gap-2 items-center justify-end'>
                <p className='text-sm text-black/80 dark:text-white/80'>{surname}</p>
              </div>
            </CardFooter>

          </Card>
        ))}
      </article>
    </>
  )
}

export default UXTest
