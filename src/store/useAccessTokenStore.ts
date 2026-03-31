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
      accessToken: null,

      setAccessToken: (newToken) =>
        set({
          accessToken: newToken,
        }),

      clearAccessToken: () =>
        set({
          accessToken: null,
        }),
    }),
    {
      name: 'tokenStorage',
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
)
