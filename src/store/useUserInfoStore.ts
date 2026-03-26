import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GetUserInfoResponse } from '../types/api-response-types/user'

interface UserInfoState {
  userInfo: GetUserInfoResponse | null
  setUserInfo: (newUserInfo: any) => void
  clearUserInfo: () => void
}

export const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: null,

      setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),

      clearUserInfo: () => set({ userInfo: null }),
    }),
    { name: 'infoStorage' }
  )
)
