import { UrlBackend } from '@/app/public-env'
import { fetcher } from '@/app/utils/fetcher'
import { NextRequest } from 'next/server'

interface PropKeys {
  [key: string]: string
}

interface Prop {
  params: PropKeys
}

export const GET = async (_req: NextRequest, context: Prop): Promise<Response> => {
  const id = context.params.id
  // await new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve('ok')
  //   }, 10000)
  // })
  return await fetcher(fetch(`${UrlBackend}/posts-like/${id}`, {
    cache: 'no-store'
  }))
}
