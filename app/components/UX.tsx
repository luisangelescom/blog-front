'use client'

import useSWR from 'swr'
import Loading from '../loading'
import { PostType } from '../types/post'
import Link from 'next/link'
import { fetchSWR } from '../utils/fetchClient'

function UXTest (): JSX.Element {
  const { data, isLoading, isValidating } = useSWR('/api/post', fetchSWR<PostType[]>, { suspense: true })

  if (isLoading || isValidating) {
    return <Loading />
  }

  return (
    <>
      {console.log(data)}
      <article className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5'>
        {data.map(({ id, title, article, user: { surname } }) => (
          <Link
            href={`/post/${id}`}
            key={id}
            className='border-2 flex flex-col border-white/20 bg-[#393E46] w-full h-[300px] rounded-lg p-4 hover:scale-95 transition-all duration-300'
          >
            <div className='w-full h-1/4'>
              <span className='text-2xl text-center text-[#00ADB5]'>{title}</span>
            </div>
            <div className='w-full h-2/4'>
              <span className='text-md text-[#EEEEEE]'>{article}</span>
            </div>
            <div className='w-full h-1/4 flex justify-end items-end'>
              <span className='text-sm font-sans font-semibold text-[#EEEEEE] tracking-wider'>{surname}</span>
            </div>
          </Link>
        ))}
      </article>
    </>
  )
}

export default UXTest
