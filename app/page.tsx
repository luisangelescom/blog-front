import { FC } from 'react'
// import Posts from './components/get-all-post'
// import LoadingPost from './components/post/loading-post'
// import { getPostUx } from './services/UX/postUx'
import UXTest from './components/UX'
import { SWRProvider } from './components/UX-provider'

export const dynamic = 'force-dynamic'

const Home: FC = async () => {
  // const data = await getPostUx()
  return (

    <SWRProvider>
      <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
        <section className='w-full flex justify-center items-center h-24'>
          <span className='text-3xl font-semibold tracking-wider text-blue-300 font-sans'>What&apos;s New on the Blog</span>
        </section>
        <UXTest />

      </main>
    </SWRProvider>

  )
}

export default Home
