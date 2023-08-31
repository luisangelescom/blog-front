import { create } from 'zustand'
import { UserPostData } from '../types/user'

interface Posts {
  loading: boolean
  posts: UserPostData | null
  setPost: (posts: UserPostData | null) => void
  setLoadingPost: (loading: boolean) => void
}

const useStorePost = create<Posts>()((set) => ({
  loading: true,
  posts: null,
  setPost: (posts: UserPostData | null) => set({ posts, loading: false }),
  setLoadingPost: (loading: boolean = false) => set(state => ({ ...state, loading }))
}))

export default useStorePost
