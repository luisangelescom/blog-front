'use client'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { registerUserService } from '../services/Login/LoginServices'
import useStoreLogin from '../store/login'
import { useRouter } from 'next/navigation'
import { fetchClient } from '../utils/fetchClient'
import { TokenData } from '../types/login'
import { Button, Card, CardBody, Input, Link, Tab, Tabs } from '@nextui-org/react'
import { actionRevalidateDashboard } from '../action-server/revalidate-server'

interface InputProps {
  name?: string
  password: string
  lastname?: string
  username: string
}

type LoginTypes = 'login' | 'sign-up'

function Login (): JSX.Element {
  const { token, loading, setToken, setLoading, preload } = useStoreLogin()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<InputProps>()

  const [login, setLogin] = useState<LoginTypes>('login')
  const { replace } = useRouter()

  useEffect(() => {
    if (token.accessToken !== null && token.accessToken !== undefined && !preload) {
      replace('/dashboard')
    }
  }, [replace, token.accessToken, preload])

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    if (login === 'login') {
      setLoading(true)
      fetchClient<TokenData>(
        fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ password: data.password, surname: data.username })
        })
      )
        .then((response) => {
          toast.success('Bienvenido.')
          replace('/dashboard')
          actionRevalidateDashboard()
          setToken(response)
        })
        .catch(() => {
          toast.error('Usuario no valido.')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      registerUserService(data)
        .then(async (r) => await r.json())
        .then((data) => {
          setLogin('login')
          toast.success('Usuario creado correctamente.')
        })
        .catch(() => {
          toast.error('Error al crear al usuario.')
        })
    }
  }

  const changeForm = (): void => {
    reset()
  }

  return (
    <main className='w-full min-h-[calc(100vh-60px)] mx-auto container flex flex-col gap-4 p-5 justify-center items-center'>
      <Card className='max-w-full w-[340px] h-[480px]'>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            size='md'
            aria-label='Tabs form'
            selectedKey={login}
            onSelectionChange={(v) => {
              setLogin(v as LoginTypes)
              changeForm()
            }}
          >
            <Tab key='login' title='Login' className='w-full h-full'>
              <form
                // eslint-disable-next-line
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 h-full'
              >
                <div className='grow flex flex-col gap-4'>
                  <div className='grow flex flex-col justify-around items-center'>
                    <div className='flex flex-col w-full gap-1'>
                      <Controller
                        name='username'
                        control={control}
                        rules={{ required: true }}
                        defaultValue=''
                        render={({ field }) => (
                          <Input
                            type='text'
                            label='Username'
                            isRequired
                            disabled={loading}
                            placeholder='Enter your user'
                            className='text-black'
                            autoComplete='off'
                            {...field}
                          />
                        )}
                      />
                      {errors.username?.type === 'required' && (
                        <span className='text-sm pl-1 text-red-500'>Username is required</span>
                      )}
                    </div>
                    <div className='flex flex-col w-full gap-1'>

                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true, minLength: 6 }}
                        defaultValue=''
                        render={({ field }) => (
                          <Input
                            type='password'
                            label='Password'
                            isRequired
                            disabled={loading}
                            placeholder='Enter your password'
                            className='text-black'
                            autoComplete='off'
                            {...field}
                          />
                        )}
                      />
                      {errors.password?.type === 'required' && (
                        <span className='text-sm pl-1 text-red-500'>Password is required</span>
                      )}
                      {errors.password?.type === 'minLength' && (
                        <span className='text-sm pl-1 text-red-500'>At least 6 digits are required for the password</span>
                      )}
                    </div>
                  </div>
                  <p className='text-center text-small'>
                    Need to create an account?{' '}
                    <Link size='sm' onPress={() => setLogin('sign-up')} className='cursor-pointer hover:underline'>
                      Sign up
                    </Link>
                  </p>
                </div>
                <div className='flex gap-2 justify-end'>
                  <Button type='submit' fullWidth color={loading ? 'default' : 'primary'} isLoading={loading} disabled={loading}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key='sign-up' title='Sign up'>
              <form
               // eslint-disable-next-line
               onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 h-[300px]'
              >
                <div className='flex flex-col w-full gap-1'>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        type='text'
                        label='Name'
                        isRequired
                        disabled={loading}
                        placeholder='Enter your name'
                        className='text-black'
                        {...field}
                      />
                    )}
                  />
                  {errors.name?.type === 'required' && <span className='text-sm pl-1 text-red-500'>Name is required</span>}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <Controller
                    name='lastname'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        type='text'
                        label='Lastname'
                        isRequired
                        disabled={loading}
                        placeholder='Enter your lastname'
                        className='text-black'
                        {...field}
                      />
                    )}
                  />
                  {errors.lastname?.type === 'required' && (
                    <span className='text-sm pl-1 text-red-500'>Lastname is required</span>
                  )}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <Controller
                    name='username'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        type='text'
                        label='Username'
                        isRequired
                        disabled={loading}
                        placeholder='Enter your username'
                        className='text-black'
                        {...field}
                      />
                    )}
                  />
                  {errors.username?.type === 'required' && (
                    <span className='text-sm pl-1 text-red-500'>Username is required</span>
                  )}
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        type='password'
                        label='Password'
                        isRequired
                        disabled={loading}
                        placeholder='Enter your password'
                        className='text-black'
                        {...field}
                      />
                    )}
                  />
                  {errors.password?.type === 'required' && (
                    <span className='text-sm pl-1 text-red-500'>Password is required</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className='text-sm pl-1 text-red-500'>At least 6 digits are required for the password</span>
                  )}
                </div>

                <p className='text-center text-small'>
                  Already have an account?{' '}
                  <Link size='sm' onPress={() => setLogin('login')} className='cursor-pointer hover:underline'>
                    Login
                  </Link>
                </p>
                <div className='flex gap-2 justify-end'>
                  <Button type='submit' fullWidth color={loading ? 'default' : 'primary'} isLoading={loading} disabled={loading}>
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </main>
  )
}

export default Login
