'use client'

import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { NextUIProvider } from '@nextui-org/react'

export function Providers ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <NextUIProvider>
      <main className='min-h-[calc(100vh-60px)] w-full'>
        {children}
        <Toaster className='tostify-test-sonner' richColors position='top-right' duration={2000} closeButton />
      </main>
    </NextUIProvider>
  )
}
