export default function LoadingPost (): JSX.Element {
  return (
    <>
      <article className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 px-2 md:px-0'>
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
    </>
  )
}
