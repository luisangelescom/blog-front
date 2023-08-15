'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { registerUserService } from '../services/Login/LoginServices'
import useStoreLogin from '../store/login'
import { useRouter } from 'next/navigation'
import { fetchClient } from '../utils/fetchClient'
import { LoadingIcon } from './icons'
import { TokenData } from '../types/login'

interface Input {
  name?: String
  password: String
  lastname?: String
  username: String
}

function Login (): JSX.Element {
  const { token, loading, setToken, setLoading, preload } = useStoreLogin()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Input>()

  const [login, setLogin] = useState<boolean>(true)
  const { replace } = useRouter()

  useEffect(() => {
    if (token.accessToken !== null && token.accessToken !== undefined && !preload) {
      replace('/dashboard')
    }
  }, [replace, token.accessToken, preload])

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (login) {
      setLoading(true)
      fetchClient<TokenData>(fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password: data.password, surname: data.username })
      })).then(response => {
        toast.success('Bienvenido.')
        replace('/dashboard')
        setToken(response)
      })
        .catch(() => {
          toast.error('Usuario no valido.')
        })
        .finally(() => { setLoading(false) })
    } else {
      registerUserService(data)
        .then(async (r) => await r.json())
        .then((data) => {
          setLogin(true)
          toast.success('Usuario creado correctamente.')
        })
        .catch(() => {
          toast.error('Error al crear al usuario.')
        })
    }
  }

  const changeForm = (change: boolean): void => {
    setLogin(change)
    reset()
  }

  return (
    <main className='w-full h-full mx-auto container flex flex-col gap-4 p-5 justify-center items-center'>
      <div className='w-full flex gap-20 justify-center items-center h-20'>
        <button
          type='button'
          onClick={() => {
            changeForm(true)
          }}
          className={`${
            login ? 'opacity-100 text-blue-500' : 'opacity-90'
          }  hover:opacity-100 hover:text-blue-500 hover:underline text-lg tracking-wider font-semibold transition-all duration-300`}
        >
          Login
        </button>
        <button
          type='button'
          onClick={() => {
            changeForm(false)
          }}
          className={`${
            !login ? 'opacity-100 text-blue-500' : 'opacity-60'
          } hover:opacity-100 hover:text-blue-500 hover:underline text-lg tracking-wider font-semibold transition-all duration-300`}
        >
          Register
        </button>
      </div>
      {login
        ? (
          <>
            <form
              // eslint-disable-next-line
              onSubmit={handleSubmit(onSubmit)}
              className='h-[500px] border-2 border-white/40 rounded-lg gap-5 max-w-[500px] w-full flex flex-col justify-center items-center p-6'
            >
              <div className='h-4/6 w-full flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='text'
                    placeholder='Username'
                    disabled={loading || preload}
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('username', { required: true })}
                    maxLength={50}
                  />
                  {errors.username?.type === 'required' && (
                    <span className='text-sm text-red-500'>Username is required</span>
                  )}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='password'
                    placeholder='Password'
                    disabled={loading || preload}
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('password', { required: true, minLength: 6 })}
                    maxLength={50}
                  />
                  {errors.password?.type === 'required' && (
                    <span className='text-sm text-red-500'>Password is required</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className='text-sm text-red-500'>At least 6 digits are required for the password</span>
                  )}
                </div>
              </div>
              <div className='h-2/6 w-full flex justify-center items-center'>
                <button
                  type={loading || preload ? 'button' : 'submit'}
                  className={`flex gap-2 justify-center items-center border-2 border-white/50 rounded-lg py-3 px-6 text-md select-none ${loading || preload ? 'bg-gray/10 cursor-wait' : 'hover:text-blue-500  '}`}
                  disabled={loading || preload}
                >
                  {loading && <LoadingIcon />}
                  Sing In
                </button>
              </div>
            </form>
          </>
          )
        : (
          <>
            <form
              // eslint-disable-next-line
              onSubmit={handleSubmit(onSubmit)}
              className='h-[500px] border-2 border-white/40 rounded-lg gap-5 max-w-[500px] w-full flex flex-col justify-center items-center p-6'
            >
              <div className='h-4/6 w-full flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='text'
                    placeholder='Name'
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('name', { required: true })}
                    maxLength={50}
                  />
                  {errors.name?.type === 'required' && <span className='text-sm text-red-500'>Name is required</span>}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='text'
                    placeholder='Lastname'
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('lastname', { required: true })}
                    maxLength={50}
                  />
                  {errors.lastname?.type === 'required' && (
                    <span className='text-sm text-red-500'>Lastname is required</span>
                  )}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='text'
                    placeholder='Username'
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('username', { required: true })}
                    maxLength={50}
                  />
                  {errors.username?.type === 'required' && (
                    <span className='text-sm text-red-500'>Username is required</span>
                  )}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='password'
                    placeholder='password'
                    className='text-black h-10 rounded-lg px-2 w-full'
                    {...register('password', { required: true })}
                    maxLength={50}
                  />
                  {errors.password?.type === 'required' && (
                    <span className='text-sm text-red-500'>Password is required</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className='text-sm text-red-500'>At least 6 digits are required for the password</span>
                  )}
                </div>
              </div>
              <div className='h-2/6 w-full flex justify-center items-center'>
                <button
                  type='submit'
                  className='border-2 border-white/50 rounded-lg py-3 px-6 text-md hover:text-blue-500 '
                >
                  Register
                </button>
              </div>
            </form>
          </>
          )}

    </main>
  )
}

export default Login
