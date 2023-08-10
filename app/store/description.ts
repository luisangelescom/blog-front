import { create } from 'zustand'
import { PostDescriptionType } from '../types/post'

interface Props {
  descriptions: PostDescriptionType[]
  setDescription: (posts: PostDescriptionType[]) => void
}

const useDescriptionPost = create<Props>()((set) => ({
  descriptions: [],
  setDescription: (descriptions: PostDescriptionType[]) => set({ descriptions })
}))

export default useDescriptionPost
