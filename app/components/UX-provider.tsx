'use client'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
export const SWRProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <SWRConfig value={{ fallbackData: [] }}>

      {/* <Suspense fallback={<>loading....</>}> */}
      {children}
      {/* </Suspense> */}

    </SWRConfig>
  )
}
