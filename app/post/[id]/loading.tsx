
function Loading (): JSX.Element {
  return (
    <div className='container mx-auto w-full h-full flex flex-col gap-5 py-5'>
      <div className='flex justify-center items-end flex-col'>
        <div className='animate-pulse w-8 h-8 bg-black/10 dark:bg-white/50 rounded' />
      </div>
      <section className='w-full flex flex-col border-b-2 border-black/10 dark:border-white/10'>
        <article className='w-full h-28 flex justify-start items-center'>
          <div className='animate-pulse w-full md:w-1/2 h-14 bg-black/10 dark:bg-white/50 rounded' />
        </article>

        <article className='w-full h-28 flex flex-col gap-4 justify-start items-center mt-10'>
          <div className='animate-pulse w-full h-5 bg-black/10 dark:bg-white/50 rounded' />
          <div className='animate-pulse w-full h-5 bg-black/10 dark:bg-white/50 rounded' />
          <div className='animate-pulse w-full h-5 bg-black/10 dark:bg-white/50 rounded' />
        </article>
      </section>
    </div>
  )
}

export default Loading
