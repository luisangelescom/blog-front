// import { UrlBackend } from '@/app/public-env'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getToken } from '@/app/utils/fetcher'

// import { UrlBackend } from '@/app/public-env'

// export const config = {
//   runtime: 'edge'
// }

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

export async function GET (req: NextRequest, res: Response): Promise<Response> {
  return new Response(getToken())
}

export async function POST (req: NextRequest, res: Response): Promise<Response> {
  const UrlBackend = 'https://blog-backend-i75f.onrender.com'
  console.log(UrlBackend)

  const fet = await fetch(`${UrlBackend}/login`, {
    method: 'POST',
    body: JSON.stringify({
      surname: 'luis-42',
      password: '111111'
    }),
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await fet.json()
  console.log(data)

  const now = new Date()
  const time = now.getTime()
  const expireTime = time + 60000
  now.setTime(expireTime)
  cookies().set({
    name: 'test',
    value: JSON.stringify(data),
    httpOnly: true,
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
