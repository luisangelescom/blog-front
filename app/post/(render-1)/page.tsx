import { FC } from 'react'
import { getPostUx } from '@/app/services/UX/postUx'
import TestRender from '@/app/components/rende-server/render/text-render'

// const TestRender = lazy(async () => await import('../../components/rende-server/render/text-render'))

interface Data {
  id: number
  title: string
  user?: { surname: string }
}

const Render1: FC = async () => {
  const posts = await getPostUx<Data[]>('/api/post')
  return (
    <>
      <span className='border-2 text-lg'>Render 1-custom</span>
      <TestRender data={posts} />
    </>
  )
}

export default Render1
