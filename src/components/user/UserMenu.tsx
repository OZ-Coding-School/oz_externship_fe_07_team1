import { useLogout } from '../../hooks/queries/useAuthQueries'
import { cn } from '../../lib/utils'
import type { GetUserInfoResponse } from '../../types/api-response-types/user'
import { useAccessTokenStore } from '../../store/useAccessTokenStore'
import { useQueryClient } from '@tanstack/react-query'

interface UserMenuProps {
  userInfo: GetUserInfoResponse | null
  className?: string
}

const USER_MENU_BTN_STYLE =
  'hover:text-primary-default hover:bg-primary-100 px-2 py-2 text-sm text-left size-full cursor-pointer transition-colors duration-200'

function UserMenu({ userInfo, className }: UserMenuProps) {
  const { mutate: logout } = useLogout()
  const { clearAccessToken } = useAccessTokenStore()
  const queryClient = useQueryClient()

  const handleLogoutBtnClicked = () => {
    logout(undefined, {
      onSuccess: () => {
        clearAccessToken()
        localStorage.clear()
        queryClient.clear()
        window.location.replace('https://my.ozcodingschool.site')
      },
    })
  }

  return (
    <div
      className={cn(
        'shadow-modal flex flex-col gap-2.5 rounded-xl bg-white px-4 py-5',
        className
      )}
    >
      <div className="flex flex-col gap-1 border-b-1 border-b-gray-200 pb-5">
        <span className="text-base font-semibold">{userInfo?.name}</span>
        <span className="text-sm text-gray-400">{userInfo?.email}</span>
      </div>
      <div className="flex flex-col gap-2">
        <button className={USER_MENU_BTN_STYLE}>수강생 등록</button>
        <a href="https://my.ozcodingschool.site/mypage">
          <button className={USER_MENU_BTN_STYLE}>마이페이지</button>
        </a>
        <button
          className={USER_MENU_BTN_STYLE}
          onClick={handleLogoutBtnClicked}
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default UserMenu
