import { PostType } from '@/app/types/post'
import Link from 'next/link'
import { EditIcon } from '../icons'
import useOpenModalPost from '@/app/store/openModalPost'

interface Props {
  data: PostType[] | undefined
}

function AllPost ({ data }: Props): JSX.Element {
  const { setOpen } = useOpenModalPost()
  return (
    <>
      {data?.length === 0 &&
        <div className='flex w-full h-52 justify-center items-center'>
          <span className='text-2xl text-white/80 font-sans tracking-wider'>You have no post</span>
        </div>}

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5'>
        {data?.map(({ id, title, article, user: { surname } }) =>
          <section className='relative' key={id}>
            <button
              title='Edit' className='absolute top-2 right-2 z-10 flex justify-center items-center w-12 h-10' onClick={event => {
                event.stopPropagation()
                setOpen(id)
              }}
            >
              <EditIcon />
            </button>
            <Link href={`/post/${id}`} key={id} className='border-2 flex flex-col border-white/20 bg-[#393E46] w-full h-[300px] rounded-lg p-4 hover:scale-95 transition-all duration-300'>
              <div className='w-full h-1/4 overflow-auto'>
                <span className='text-2xl text-center text-[#00ADB5]'>{title}</span>
              </div>
              <div className='w-full h-2/4 overflow-auto'>
                <span className='text-md text-[#EEEEEE]'>{article}</span>
              </div>
              <div className='w-full h-1/4 flex justify-end items-end'>
                <span className='text-sm font-sans font-semibold text-[#EEEEEE] tracking-wider'>{surname}</span>
              </div>
            </Link>
          </section>
        )}
      </div>
    </>
  )
}

export default AllPost
