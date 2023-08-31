import { UrlBackend, UrlFrontend } from '@/app/public-env'
import { getToken } from '@/app/utils/fetcher'
import { cookies } from 'next/headers'

export async function getPostUx<T> (path: string): Promise<T> {
  const res = await fetch(`${UrlFrontend}/${path}`, { next: { revalidate: 36000 } })
  if (!res.ok) {
    console.log(res.status)
    if (res.status === 404) {
      return [] as T
    }
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
  try {
    const res = await fetch(`${UrlBackend}/${path}`, {
      next: { revalidate: 36000 },
      headers: {
        Authorization: `Bearer ${getToken() ?? ''}`
      }
    })

    if (!res.ok) {
      if (res.status === 401) {
        console.log(cookies().getAll())
      }
      if (res.status === 400) {
        return await res.json()
      }

      throw new Error('Unauthorize', { cause: await res.json() })
    }

    return await res.json()
  } catch (error) {
    throw new Error('Server internal error.')
  }
}
