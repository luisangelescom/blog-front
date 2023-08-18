import { FC } from 'react'
import UXTest from './components/UX'
import { getPostUx } from './services/UX/postUx'
import { PostType } from './types/post'

export const dynamic = 'force-dynamic'

const Home: FC = async () => {
  const data = await getPostUx<PostType[]>('api/post')
  return (

    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <section className='w-full flex justify-center items-center h-24'>
        <span className='text-3xl font-semibold tracking-wider text-blue-300 font-sans'>What&apos;s New on the Blog</span>
      </section>
      <UXTest data={data} />

    </main>

  )
}

export default Home
