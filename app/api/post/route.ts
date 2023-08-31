import { UrlBackend } from '@/app/public-env'
import { fetcher, getToken } from '@/app/utils/fetcher'
import { NextRequest } from 'next/server'

export const GET = async (): Promise<Response> => await fetcher(fetch(`${UrlBackend}/posts`))

export const POST = async (req: NextRequest): Promise<Response> => {
  const body = await req.json()

  return await fetcher(fetch(`${UrlBackend}/posts`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${getToken() ?? ''}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  }))
}
