import { UrlBackend } from '@/app/public-env'
import { NextRequest } from 'next/server'

import { fetcher, getToken } from '@/app/utils/fetcher'

interface PropKeys {
  [key: string]: string
}

interface Prop {
  params: PropKeys
}

export const GET = async (_req: NextRequest, context: Prop): Promise<Response> => {
  const id = context.params.id
  return await fetcher(
    fetch(`${UrlBackend}/posts-description/${id}`, {
      method: 'GET'
    })
  )
}

export const POST = async (req: NextRequest, context: Prop): Promise<Response> => {
  const id = context.params.id
  const body = await req.json()

  return await fetcher(
    fetch(`${UrlBackend}/posts-description/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${getToken() ?? ''}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  )
}
