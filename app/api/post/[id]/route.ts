import { UrlBackend } from '@/app/public-env'
import { fetcher, getToken } from '@/app/utils/fetcher'
import { NextRequest } from 'next/server'

interface PropKeys {
  [key: string]: string
}

interface Prop {
  params: PropKeys
}

export const GET = async (_req: NextRequest, context: Prop): Promise<Response> => {
  const id = context.params.id
  return await fetcher(fetch(`${UrlBackend}/posts/${id}`, {
    method: 'GET'
  }))
}

export const PATCH = async (req: NextRequest, context: Prop): Promise<Response> => {
  const id = context.params.id
  const body = await req.json()

  return await fetcher(fetch(`${UrlBackend}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${getToken() ?? ''}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  }))
}
