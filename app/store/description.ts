import { create } from 'zustand'
import { PostDescriptionType } from '../types/post'

interface Props {
  isLoading: boolean
  preload: boolean
  descriptions: PostDescriptionType[]
  setDescription: (posts: PostDescriptionType[]) => void
  setLoading: (loading?: boolean) => void
}

const useDescriptionPost = create<Props>()((set) => ({
  isLoading: false,
  preload: true,
  descriptions: [],
  setDescription: (descriptions: PostDescriptionType[]) => set({ descriptions }),
  setLoading: (loading: boolean = false) => set((state) => ({ ...state, isLoading: loading, preload: state.preload && false }))
}))

export default useDescriptionPost
