import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'

import { PostType } from '@/app/types/post'
import useOpenModalPost from '@/app/store/openModalPost'

import { EditIcon } from '../icons'
import { memo } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  data: PostType[] | undefined
}

function AllPost ({ data }: Props): JSX.Element {
  const { setOpen } = useOpenModalPost()
  const { push } = useRouter()

  return (
    <>
      {data?.length === 0 && (
        <div className='flex w-full h-52 justify-center items-center'>
          <span className='text-2xl text-white/80 font-sans tracking-wider'>You have no post</span>
        </div>
      )}

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5'>
        {data?.map(({ id, title, article, user: { surname } }) => (
          <div key={id} className='w-full h-full relative'>
            <Button
              title='Edit'
              color='primary'
              variant='solid'
              size='sm'
              className='absolute z-20 -top-3 right-0 flex justify-center items-center w-12 h-10'
              onClick={(event) => {
                event.stopPropagation()
                setOpen(id)
              }}
            >
              <EditIcon />
            </Button>
            <Card
              isFooterBlurred
              isPressable
              className='w-full h-[300px]'
              radius='sm'
              onClick={() => {
                push(`/post/${id}`)
              }}
            >
              <CardHeader className='absolute flex w-full rounded-sm p-2'>
                <p
                  title={title}
                  className='text-lg leading-2 text-black/80 uppercase font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis'
                >
                  {title}
                </p>
                {/* <button
                title='Edit' className='absolute top-2 right-2 z-10 flex justify-center items-center w-12 h-10' onClick={event => {
                  event.stopPropagation()
                  setOpen(id)
                }}
              >
                <EditIcon />
              </button> */}

              </CardHeader>
              <Image
                removeWrapper
                alt='Relaxing app background'
                className='z-0 w-full h-full object-cover'
                src='https://img.freepik.com/vector-gratis/concepto-pagina-destino-proceso-diseno_52683-27124.jpg'
              />
              <CardFooter className='absolute bg-black/40 bottom-0 rounded-b-sm'>
                <div className='flex flex-grow gap-2 items-center justify-end'>
                  <p className='text-sm text-black/80'>{surname}</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(AllPost)
