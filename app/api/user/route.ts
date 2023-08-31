
import { UrlBackend } from '@/app/public-env'
import { fetcher, getToken } from '@/app/utils/fetcher'
import { NextFetchEvent, NextResponse } from 'next/server'

export const GET = async (): Promise<Response> => {
  return await fetcher(fetch(`${UrlBackend}/users/posts/all`, {
    headers: {
      Authorization: `Bearer ${getToken() ?? ''}`
    }
  }))
}

export async function POST (req: Request, event: NextFetchEvent): Promise<NextResponse> {
  const token = await fetch(`${UrlBackend}/login`, {
    method: 'POST',
    body: JSON.stringify({
      surname: '123',
      password: '123456'
    }),
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await token.json()
  return NextResponse.json(data)
}
