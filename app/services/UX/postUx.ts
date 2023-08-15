import { UrlBackend } from '@/app/public-env'
import { PostType } from '@/app/types/post'

export async function getPostUx (): Promise<PostType[]> {
  const res = await fetch(`${UrlBackend}/posts`, { next: { revalidate: 2 }, cache: 'reload' })
  return await res.json()
}
