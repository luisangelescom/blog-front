import { UrlBackend } from '@/app/public-env'
import { fetcher } from '@/app/utils/fetcher'

export const GET = async (): Promise<Response> => await fetcher(fetch(`${UrlBackend}/posts`))
