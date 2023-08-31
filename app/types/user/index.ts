
import { UserPost } from '@/app/types/post'
export interface UserPostData {
  id: number
  name: string
  lastname: string
  surname: string
  password: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  posts: Post[]
}

export interface Post {
  id: number
  title: string
  article: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  user: UserPost
}
