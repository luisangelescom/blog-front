import { create } from 'zustand'
import { PostType } from '../types/post'

interface Posts {
  posts: PostType[]
  setPost: (posts: PostType[]) => void
}

const useStorePost = create<Posts>()((set) => ({
  posts: [],
  setPost: (posts: PostType[]) => set({ posts })
}))

export default useStorePost
