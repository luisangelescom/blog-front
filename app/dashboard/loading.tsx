import LoadingPost from '../components/dashboard/loading-post'

function Loading (): JSX.Element {
  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>
      <LoadingPost />
    </main>
  )
}

export default Loading
