import { UrlBackend } from '@/app/public-env'
import { NextResponse, NextRequest } from 'next/server'

export async function GET (req: NextRequest, res: Response): Promise<NextResponse> {
  const fet = await fetch(`${UrlBackend}/login`, {
    method: 'POST',
    body: JSON.stringify({
      surname: '123',
      password: '123456'
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'

    }
  })
  try {
    const data = await fet.json()
    return NextResponse.json(data)
  } catch (error) {
    const data = await fet.json()
    console.log(data)
    return NextResponse.json(data)
  }
}
