import { UrlBackend, UrlFrontend } from '@/app/public-env'
import { getToken } from '@/app/utils/fetcher'
import { cookies } from 'next/headers'

export async function getPostUx<T> (path: string): Promise<T> {
  const res = await fetch(`${UrlFrontend}/${path}`, { cache: 'force-cache' })
  if (!res.ok) {
    // probar con throw y cachar con error boundary
    throw new Error('No se encontraron datos')
  }

  return await res.json()
}

export async function getPostUxWithCredential<T> (path: string): Promise<T> {
  // await new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve('ok')
  //   }, 2000)
  // })
  // console.log('path')
  // console.log(path)

  // console.log(getToken())
  // console.log(cookies().getAll())
  // console.log('===========================')
  try {
    const res = await fetch(`${UrlBackend}/${path}`, {
      cache: 'force-cache',
      headers: {
        Authorization: `Bearer ${getToken() ?? ''}`
      }
    })

    if (!res.ok) {
      if (res.status === 401) {
      // deleteCookie('token')

        console.log(cookies().getAll())
      }

      throw new Error('Unauthorize', { cause: await res.json() })
    }

    return await res.json()
  } catch (error) {
    throw new Error('Server internal error.')
  }
}
