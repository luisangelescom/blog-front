import { cookies } from 'next/headers'
import crypt from 'crypto-js'
import { BASIC_ENCRYPT_SECRET } from '../private-env'

interface otherProps {
  headers?: HeadersInit
}

export const getDataToken = (): string | null => {
  try {
    if (cookies().get('token') !== undefined) {
      const token = cookies().get('token')

      const bytes = crypt.AES.decrypt(token?.value ?? '', BASIC_ENCRYPT_SECRET).toString(crypt.enc.Utf8)

      return bytes
    }
    return null
  } catch (error) {
    cookies().delete('token')
    return null
  }
}

export const getToken = (): string => {
  const data = getDataToken()
  if (data !== null) {
    return JSON.parse(data).accessToken
  }
  return ''
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

export const fetcherLogin = async (fetcherCustom: Promise<Response>, headersCustom: HeadersInit = {}): Promise<Response> => {
  let status = 500
  let json = {
    message: 'Internal server error'
  }
  const headers: HeadersInit = { ...headersCustom }

  try {
    const res = await fetcherCustom
    status = res.status
    json = await res.json()
    if (res.ok) {
      const now = new Date()
      const time = now.getTime()

      // !! Revisar duration token
      const expireTime = time + 60 * 60 * 60 * 60
      now.setTime(expireTime)
      cookies().set({
        name: 'token',
        value: crypt.AES.encrypt(JSON.stringify(json), BASIC_ENCRYPT_SECRET).toString(),
        httpOnly: true,
        // !! Revisar sameSite
        sameSite: 'lax',
        expires: expireTime
      })
    } else {
      cookies().delete('token')
    }
  } catch (error) {
    // Se agrega um sentry o algún sistema para hacer le tracking
  }

  return await responseBuilder(status, JSON.stringify(json), { headers })
}

const responseBuilder = async (status: number, json: string, { headers }: otherProps = {}): Promise<Response> =>
  new Response(json, { status, headers: { ...headers, 'content-type': 'application/json' } })
