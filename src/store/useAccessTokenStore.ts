import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessTokenState {
  accessToken: string
  setAccessToken: (newToken: string) => void
  clearAccessToken: () => void
}

export const useAccessTokenStore = create<AccessTokenState>()(
  persist(
    (set) => ({
      // 액세스 토큰 값
      accessToken: '',

      setAccessToken: (newToken) => set({ accessToken: newToken }),

      clearAccessToken: () => set({ accessToken: '' }),
    }),
    { name: 'tokenStorage' }
  )
)
