import { UrlBackend } from '@/app/public-env'

export const allUserPosts = async (accessToken: string): Promise<Response> => await fetch(`${UrlBackend}/posts/users`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
})

export const addCommentsPost = async (accessToken: string, postId: number, description: string): Promise<Response> => await fetch(`${UrlBackend}/posts-description/${postId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify({ description })
})

export const addLikePost = async (accessToken: string, postId: string): Promise<Response> => await fetch(`${UrlBackend}/posts-like/${postId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
})

export const allDescriptionPost = async (postId: string): Promise<Response> => await fetch(`${UrlBackend}/posts-description/${postId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
