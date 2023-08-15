import AllDescription from '@/app/components/post/all-description'
import HeaderPost from '@/app/components/post/header-post'
import { FC } from 'react'

const PostId: FC<{ params: { id: String } }> = async ({ params }) => {
  return (
    <main className='container mx-auto w-full h-full flex flex-col gap-5 py-5 px-5 sm:px-0'>
      <HeaderPost postId={params.id.toString()} />

      <section className='border-b-2 border-white/20 flex flex-col gap-5'>
        <AllDescription postId={params.id.toString()} />
      </section>
    </main>
  )
}

export default PostId
