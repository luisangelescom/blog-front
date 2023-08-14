import AllDescription from '@/app/components/post/all-description'
import HeaderPost from '@/app/components/post/header-post'
import { UrlBackend } from '@/app/public-env'
import { PostType } from '@/app/types/post'
import { FC } from 'react'

async function getPostId (id: String): Promise<PostType> {
  // eslint-disable-next-line
  const res = await fetch(`${UrlBackend}/posts/${id}`, { next: { tags: ["a"] } });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}

const PostId: FC<{ params: { id: String } }> = async ({ params }) => {
  const data = await getPostId(params.id)

  return (
    <main className='container mx-auto w-full h-full flex flex-col gap-5 py-5 px-5 sm:px-0'>
      <HeaderPost title={data.title} article={data.article} postId={params.id.toString()} />

      <section className='border-b-2 border-white/20 flex flex-col gap-5'>
        <AllDescription postId={params.id.toString()} />
      </section>
    </main>
  )
}

export default PostId
