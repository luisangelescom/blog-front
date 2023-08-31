'use client'

import Link from 'next/link'
import { HomeIcon } from './icons'
import useStoreLogin from '../store/login'
import { useEffect } from 'react'
import { TokenData } from '../types/login'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
// import { actionRevalidateDashboard } from '../action-server/revalidate-server'
import { useRouter } from 'next/navigation'
import { fetchClient } from '../utils/fetchClient'

interface Props {
  data: TokenData | null
}

function ItemsHeaders ({ data }: Props): JSX.Element {
  const { token, preload, setPreload, setToken, loading, setLoading, deleteToken } = useStoreLogin()
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
  }, [data]);

  const deleteTokenServer = (): void => {
    setLoading(true)
    fetchClient(
      fetch('/api/login', {
        method: 'DELETE'
      })
    )
      .then(() => {
        deleteToken()
      })
      .finally(() => {
        setLoading(false)
      })
  }

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

      <Dropdown placement='bottom-end'>

        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='primary'
            name='Jason Hughes'
            size='sm'
            src={token.accessToken === null || token.accessToken === undefined || loading || preload ? 'https://img.freepik.com/free-icon/user_318-159711.jpg' : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
          />
        </DropdownTrigger>
        {token.accessToken === null || token.accessToken === undefined || loading || preload
          ? (
            <DropdownMenu aria-label='Profile Actions' variant='shadow'>
              <DropdownItem
                key='login'
                className='text-black'
                onPress={() => {
                  push('/login')
                }}
              >
                Login
              </DropdownItem>
            </DropdownMenu>
            )
          : (
            <DropdownMenu aria-label='Profile Actions' variant='shadow'>

              <DropdownItem
                key='dashboard'
                className='text-black'
                onPress={() => {
                  push('/dashboard')
                }}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key='logout' color='danger' className='text-black' onPress={() => {
                  deleteTokenServer()
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>

            )}
      </Dropdown>
    </div>
  )
}

export default ItemsHeaders
