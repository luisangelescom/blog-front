'use client'

import Link from 'next/link'
import { HomeIcon, PersonIcon } from './icons'
import useStoreLogin from '../store/login'
import useStore from './hooks/useHookStore'

function ItemsHeaders (): JSX.Element {
  const token = useStore(useStoreLogin, (state) => state.token)

  return (
    <>
      <Link href='/' title='Home'>
        <HomeIcon />
      </Link>
      {token?.accessToken === null || token?.accessToken === undefined
        ? (
          <Link href='/login' title='login'>
            <PersonIcon />
          </Link>
          )
        : (
          <Link href='/dashboard' title='login'>
            <span className='border-2 py-2 px-4 rounded-md hover:text-blue-400 hover:border-blue-400'>Dashboard</span>
          </Link>
          )}
    </>
  )
}

export default ItemsHeaders
