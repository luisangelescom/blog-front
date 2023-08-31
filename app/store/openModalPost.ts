import { create } from 'zustand'

interface CreateOrUpdatePost {
  open: boolean
  postId: number | undefined
  setOpen: (postId?: number) => void
  setClose: () => void
}
const useOpenModalPost = create<CreateOrUpdatePost >()((set) => ({
  open: false,
  postId: undefined,
  setOpen: (postId: number | undefined = undefined) => set((state) => ({ ...state, open: true, postId })),
  setClose: () => set((state) => ({ ...state, open: false }))
}))

export default useOpenModalPost
