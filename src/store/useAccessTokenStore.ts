import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessTokenState {
  accessToken: string | null
  setAccessToken: (newToken: string) => void
  clearAccessToken: () => void
}

export const useAccessTokenStore = create<AccessTokenState>()(
  persist(
    (set) => ({
      // 액세스 토큰 값
      accessToken: import.meta.env.VITE_TEMPORARY_ACCESS_TOKEN || null,

      setAccessToken: (newToken) => set({ accessToken: newToken }),

      clearAccessToken: () => set({ accessToken: '' }),
    }),
    { name: 'tokenStorage' }
  )
)
