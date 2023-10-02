import { ReactNode } from 'react'

function Layout ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className='h-full flex flex-col gap-2'>
      <span>Layout render1</span>
      {children}
    </div>
  )
}

export default Layout
