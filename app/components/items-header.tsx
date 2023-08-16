'use client'

import Link from 'next/link'
import { HomeIcon, LoadingIcon, PersonIcon } from './icons'
import useStoreLogin from '../store/login'
import { useCallback, useEffect } from 'react'
import { fetchClient } from '../utils/fetchClient'
import { TokenData } from '../types/login'

function ItemsHeaders (): JSX.Element {
  const { token, preload, setPreload, setToken, loading } = useStoreLogin()

  const getToken = useCallback(() => {
    fetchClient<TokenData>(fetch('/api/login'))
      .then((response) => {
        setToken(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setPreload()
      })
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getToken()
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Link href='/' title='Home'>
        <HomeIcon />
      </Link>
      {token.accessToken === null || token.accessToken === undefined || loading
        ? (
          <Link href='/login' title='login'>
            {preload || loading
              ? (
                <div title='Loading User'>
                  <LoadingIcon />
                </div>
                )
              : (
                <PersonIcon />
                )}
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
