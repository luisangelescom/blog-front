import { UrlBackend } from '@/app/public-env'
import { PostProps } from '@/app/types/post'

export const getAllPost = async (): Promise<Response> => await fetch(`${UrlBackend}/posts`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const createPost = async (accessToken: string, data: PostProps): Promise<Response> => await fetch(`${UrlBackend}/posts`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify(data)
})

export const updatePost = async (accessToken: string, data: PostProps, id: number): Promise<Response> => await fetch(`${UrlBackend}/posts/${id}`, {
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify(data)
})
