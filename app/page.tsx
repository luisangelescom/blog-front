import { FC } from 'react'
import Posts from './components/get-all-post'

const Home: FC = async () => {
  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <section className='w-full flex justify-center items-center h-24'>
        <span className='text-3xl font-semibold tracking-wider text-blue-300 font-sans'>What&apos;s New on the Blog</span>
      </section>

      <Posts />

    </main>
  )
}

export default Home
