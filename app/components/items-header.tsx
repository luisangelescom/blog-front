'use client'

import Link from 'next/link'
import { HomeIcon, LoadingIcon, PersonIcon } from './icons'
import useStoreLogin from '../store/login'
import { useEffect } from 'react'
import { TokenData } from '../types/login'
import { Button } from '@nextui-org/react'
// import { actionRevalidateDashboard } from '../action-server/revalidate-server'
import { useRouter } from 'next/navigation'

interface Props {
  data: TokenData | null
}

function ItemsHeaders ({ data }: Props): JSX.Element {
  const { token, preload, setPreload, setToken, loading, deleteToken } = useStoreLogin()
  const { push } = useRouter()

  // const getToken = useCallback(() => {
  //   fetchClient<TokenData>(fetch('/api/login'))
  //     .then((response) => {
  //       setToken(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //     .finally(() => {
  //       setPreload()
  //     })
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (data !== null) {
      setToken(data)
    } else {
      deleteToken()
    }
    setPreload()
  // eslint-disable-next-line
  }, [data])

  return (
    <div className='flex items-center gap-4'>
      <Link href='/' title='Home'>
        <HomeIcon />
      </Link>
      {/* <Button
        color='primary' onClick={() => {
          // refresh()
          actionRevalidateDashboard()
        }}
      >Render
      </Button> */}
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
          <Button
            color='primary'
            type='button'
            size='md'
            onPress={() => {
              push('/dashboard')
            }}
          >
            Dashboard
          </Button>
          )}
    </div>
  )
}

export default ItemsHeaders
