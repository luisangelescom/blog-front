export default function Loading (): JSX.Element {
  return (
    <main className='container mx-auto px-5 sm:px-0 flex flex-col gap-5'>

      {/* <section className='w-full flex justify-center items-center h-24'>
        <div className='animate-pulse max-w-[450px] w-full h-10 bg-white/50 rounded' />
      </section> */}
      <article className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 px-2 md:px-0'>
        {/* eslint-disable-next-line */}
        {[...Array(5).keys()].map((id) =>
          <div key={id} className='border-2 flex flex-col border-white/20 bg-[#393E46] w-full h-[300px] rounded-lg p-4 hover:scale-95 transition-all duration-300'>
            <div className='w-full h-1/4'>
              <div className='animate-pulse h-5 bg-white/50 rounded' />
            </div>
            <div className='w-full h-2/4 flex flex-col gap-2'>
              <div className='animate-pulse h-3 bg-white/50 rounded' />
              <div className='animate-pulse h-3 bg-white/50 rounded' />
            </div>
            <div className='w-full h-1/4 flex justify-end items-end'>
              <div className='animate-pulse w-[60px] h-5 bg-white/50 rounded' />
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
