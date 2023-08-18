import AllDescription from '@/app/components/post/all-description'
import HeaderPost from '@/app/components/post/header-post'
import { getPostUx } from '@/app/services/UX/postUx'
import { PostDescriptionType, PostProps } from '@/app/types/post'
import { FC } from 'react'

const PostId: FC<{ params: { id: string } }> = async ({ params }) => {
  const data = await getPostUx<PostDescriptionType[]>(`/api/description/${params.id}`)
  const post = await getPostUx<PostProps>(`/api/post/${params.id}`)
  return (
    <main className='container mx-auto w-full h-full flex flex-col gap-5 py-5 px-5 sm:px-0'>
      <HeaderPost post={post} postId={params.id} />

      <section className='border-b-2 border-white/20 flex flex-col gap-5'>
        <AllDescription data={data} postId={params.id} />
      </section>
    </main>
  )
}

export default PostId
