import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessTokenState {
  accessToken: string | null
  setAccessToken: (newToken: string) => void
  clearAccessToken: () => void
  isValidToken: () => boolean
}

export const useAccessTokenStore = create<AccessTokenState>()(
  persist(
    (set, get) => ({
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

      isValidToken: () => {
        const accessToken = get().accessToken
        return (
          typeof accessToken === 'string' &&
          accessToken !== 'null' &&
          accessToken !== 'undefined' &&
          accessToken.trim() !== ''
        )
      },
    }),
    {
      name: 'tokenStorage',
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
)
