'use client'

import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export function Providers ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main className='min-h-screen w-full'>
      {children}
      <Toaster className='tostify-test-sonner' richColors position='top-right' duration={2000} closeButton />
    </main>
  )
}
