import { FC, Suspense, lazy } from 'react'
import Loading from './loading2'

const TestRender = lazy(async () => await import('../../components/rende-server/render/text-render'))

const Render1: FC = () => {
  return (
    <>
      <span className='border-2 text-lg'>Render 1-custom</span>
      <Suspense fallback={<Loading />}>
        <TestRender />
      </Suspense>
    </>
  )
}

export default Render1
