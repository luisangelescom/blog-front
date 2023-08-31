import { create } from 'zustand'
import { PostType } from '../types/post'

interface CreateOrUpdatePost {
  posts: PostType[]
  setPosts: (posts: PostType[]) => void
}
const usePostStore = create<CreateOrUpdatePost >()((set) => ({
  posts: [],
  setPosts: (posts: PostType[]) => set({ posts })
}))

export default usePostStore
