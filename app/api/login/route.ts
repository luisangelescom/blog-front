// import { UrlBackend } from '@/app/public-env'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import crypt from 'crypto-js'
import { BASIC_ENCRYPT_SECRET } from '@/app/private-env'
import { getToken } from '@/app/utils/fetcher'

// import { UrlBackend } from '@/app/public-env'

export const config = {
  runtime: 'edge'
}

// export async function GET (req: NextRequest): Promise<Response> {
//   return new Response(
//     JSON.stringify({}), {
//       status: 200,
//       headers: {
//         'content-type': 'application/json'
//       }
//     }
//   )
// }

export async function POST (): Promise<Response> {
  const token = getToken()
  if (token !== null) {
    return NextResponse.json({ message: getToken() }, { status: 200 })
  } else {
    return NextResponse.json({ message: getToken() }, { status: 400 })
  }
}

export async function GET (): Promise<Response> {
  const UrlBackend = 'https://blog-backend-i75f.onrender.com'

  const fet = await fetch(`${UrlBackend}/login`, {
    method: 'POST',
    body: JSON.stringify({
      surname: 'luis-42',
      password: '111111'
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const data = await fet.json()
  console.log(data)

  const now = new Date()
  const time = now.getTime()
  const expireTime = time + 1200000
  now.setTime(expireTime)
  cookies().set({
    name: 'token',
    value: crypt.AES.encrypt(JSON.stringify(data), BASIC_ENCRYPT_SECRET).toString(),
    httpOnly: true,
    sameSite: 'lax',
    // secure: true,
    expires: expireTime
  })
  return new Response(JSON.stringify(data), {
    status: fet.ok ? 200 : fet.status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      'x-hello-from-middleware2': 'custom'
    }
  })

  // const fet = await fetch(`${UrlBackend}/login`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     surname: '123',
  //     password: '123456'
  //   }),
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'

  //   }
  // })
  // try {
  //   const data = await fet.json()
  //   return NextResponse.json(data)
  // } catch (error) {
  //   const data = await fet.json()
  //   console.log(data)
  //   return NextResponse.json(data)
  // }
}
