// import { UrlBackend } from '@/app/public-env'
import { NextRequest, NextResponse } from 'next/server'

import { fetcherLogin, getDataToken } from '@/app/utils/fetcher'
import { UrlBackend } from '@/app/public-env'

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

export async function GET (): Promise<Response> {
  const token = getDataToken()

  if (token !== null) {
    console.log('token')
    console.log(token)
    return NextResponse.json(JSON.parse(token), { status: 200 })
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST (req: NextRequest): Promise<Response> {
  const data = await req.json()
  return await fetcherLogin(
    fetch(`${UrlBackend}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  )
  // .then(async (response) => {
  //   if (response.ok) {
  //     return await response.json()
  //   }
  //   throw new Error(await response.json())
  // })
  // .then((response) => {
  //   console.log(response)
  //   const now = new Date()
  //   const time = now.getTime()
  //   const expireTime = time + 1200000
  //   now.setTime(expireTime)
  //   cookies().set({
  //     name: 'token',
  //     value: crypt.AES.encrypt(JSON.stringify(response), BASIC_ENCRYPT_SECRET).toString(),
  //     httpOnly: true,
  //     sameSite: 'lax',
  //     expires: expireTime
  //   })

  //   return response
  // })
  // .catch((error) => {
  //   console.log('error')
  //   console.log(error)
  //   return error
  // })

  // console.log('data')

  // const now = new Date()
  // const time = now.getTime()
  // const expireTime = time + 1200000
  // now.setTime(expireTime)
  // cookies().set({
  //   name: 'token',
  //   value: crypt.AES.encrypt(JSON.stringify(data), BASIC_ENCRYPT_SECRET).toString(),
  //   httpOnly: true,
  //   sameSite: 'lax',
  //   // secure: true,
  //   expires: expireTime
  // })
  // return new Response(JSON.stringify(data), {
  //   status: fet.ok ? 200 : fet.status,
  //   headers: {
  //     'content-type': 'application/json',
  //     'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
  //     'x-hello-from-middleware2': 'custom'
  //   }
  // })

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
