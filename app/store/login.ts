import { create } from 'zustand'
import { TokenData } from '../types/login'

interface Login {
  loading: boolean
  preload: boolean
  token: TokenData
  setToken: (token: TokenData) => void
  setLoading: (loading?: boolean) => void
  setPreload: () => void
  deleteToken: () => void
}

const useStoreLogin = create<Login >()((set) => ({
  loading: false,
  preload: true,
  token: { accessToken: null, data: null },
  setToken: (token: TokenData) => set({ token }),
  setLoading: (loading: boolean = false) => set(state => ({ ...state, loading })),
  setPreload: () => set(state => ({ ...state, preload: false })),
  deleteToken: () => set({ token: { accessToken: null, data: null } })
}))

// const useStoreLogin = create<Login >()(persist(
//   (set, get) => ({
//     token: { accessToken: null, data: null },
//     setToken: (token: TokenData) => set({ token }),
//     deleteToken: () => set({ token: { accessToken: null, data: null } })
//   }), {
//     name: 'token'
//   }
// ))

export default useStoreLogin
