import { cookies } from 'next/headers'
import crypt from 'crypto-js'
import { BASIC_ENCRYPT_SECRET } from '../private-env'

interface otherProps {
  headers?: HeadersInit
}

export const getToken = (): string | null => {
  try {
    if (cookies().get('token') !== null) {
      const token = cookies().get('token')
      console.log(token)

      const bytes = crypt.AES.decrypt(token?.value ?? '', BASIC_ENCRYPT_SECRET).toString(crypt.enc.Utf8)
      return JSON.parse(bytes).accessToken
    }
    return null
  } catch (error) {
    console.log(error)
    cookies().delete('token')
    return null
  }
}

export const fetcher = async (fetcherCustom: Promise<Response>, headersCustom: HeadersInit = {}): Promise<Response> => {
  let status = 500
  let json = {
    message: 'Internal server error'
  }
  const headers: HeadersInit = { ...headersCustom }

  try {
    const res = await fetcherCustom
    status = res.status
    json = await res.json()
  } catch (error) {
    // Se agrega um sentry o algún sistema para hacer le tracking
  }

  return await responseBuilder(status, JSON.stringify(json), { headers })
}

const responseBuilder = async (status: number, json: string, { headers }: otherProps = {}): Promise<Response> =>
  new Response(json, { status, headers: { ...headers, 'content-type': 'application/json' } })
