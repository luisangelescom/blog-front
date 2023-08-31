
function Loading (): JSX.Element {
  return (
    <div className='container mx-auto w-full h-full flex flex-col gap-5 py-5'>
      <section className='w-full flex flex-col border-b-2 border-white/10'>
        <article className='w-full flex flex-col gap-4 justify-start items-center'>
          <div className='animate-pulse w-full h-32 bg-white/50 rounded' />
          <div className='flex justify-end items-center w-full'>
            <div className='animate-pulse w-20 h-10 bg-white/50 rounded-lg' />
          </div>
        </article>

        <article className='w-full flex flex-col gap-4 justify-start items-center mt-10'>
          <div className='animate-pulse w-full h-16 bg-white/50 rounded' />
          <div className='animate-pulse w-full h-16 bg-white/50 rounded' />
          <div className='animate-pulse w-full h-16 bg-white/50 rounded' />
        </article>
      </section>
    </div>
  )
}

export default Loading
