import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TokenData } from '../types/login'

interface Login {
  token: TokenData
  setToken: (token: TokenData) => void
  deleteToken: () => void
}

const useStoreLogin = create<Login >()(persist(
  (set, get) => ({
    token: { accessToken: null, data: null },
    setToken: (token: TokenData) => set({ token }),
    deleteToken: () => set({ token: { accessToken: null, data: null } })
  }), {
    name: 'token'
  }
))

export default useStoreLogin
