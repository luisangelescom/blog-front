import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Login {
  accessToken: String | null
  setToken: (accessToken: String | null) => void
}

const useStoreLogin = create<Login >()(persist(
  (set, get) => ({
    accessToken: null,
    setToken: (accessToken: String | null) => set({ accessToken })
  }), {
    name: 'token'
  }
))

export default useStoreLogin
