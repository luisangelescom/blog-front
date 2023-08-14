
function LoadingPost (): JSX.Element {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5'>
      {[...Array(4).keys()].map((id) =>
        <section className='relative' key={id}>
          <button
            title='Edit' className='absolute top-2 right-2 z-10 flex justify-center items-center w-12 h-10'
          >
            <div className='animate-pulse w-full h-full bg-white/50 rounded' />
          </button>
          <div className='border-2 flex flex-col border-white/20 bg-[#393E46] w-full h-[300px] rounded-lg p-4'>
            <div className='w-3/4 h-1/4 overflow-auto'>
              <div className='animate-pulse h-5 bg-white/50 rounded' />
            </div>
            <div className='w-full h-2/4 overflow-auto flex flex-col gap-2'>
              <div className='animate-pulse h-3 bg-white/50 rounded' />
              <div className='animate-pulse h-3 bg-white/50 rounded' />
              <div className='animate-pulse h-3 bg-white/50 rounded' />
            </div>
            <div className='w-full h-1/4 flex justify-end items-end'>
              <div className='animate-pulse w-16 h-5 bg-white/50 rounded' />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default LoadingPost
