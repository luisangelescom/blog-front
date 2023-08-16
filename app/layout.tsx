import type { Metadata } from 'next'

import { Inter, Roboto_Mono } from 'next/font/google'

import ItemsHeaders from './components/items-header'

import './globals.css'
import { Providers } from './provider'

// const inter = Inter({ subsets: ['latin'] })

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <header className='sticky top-0 border-b-2 border-white/20 bg-black/50 z-10 drop-shadow-sm h-16 flex gap-8 items-center justify-end container mx-auto px-2 sm:px-0'>
          <ItemsHeaders />
        </header>
        <Providers>
          {children}
        </Providers>

        {/* <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        /> */}
      </body>
    </html>
  )
}
