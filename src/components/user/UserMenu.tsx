import { cn } from '../../lib/utils'

interface UserMenuProps {
  className?: string
}

const USER_MENU_BTN_STYLE =
  'hover:text-primary-default hover:bg-primary-100 px-2 py-2 text-sm text-left size-full cursor-pointer transition-colors duration-200'

function UserMenu({ className }: UserMenuProps) {
  return (
    <div
      className={cn(
        'shadow-modal flex flex-col gap-2.5 rounded-xl bg-white px-4 py-5',
        className
      )}
    >
      <div className="flex flex-col gap-1 border-b-1 border-b-gray-200 pb-5">
        <span className="text-base font-semibold">오즈오즈</span>
        <span className="text-sm text-gray-400">ozschool1234@gmail.com</span>
      </div>
      <div className="flex flex-col gap-2">
        <button className={USER_MENU_BTN_STYLE}>수강생 등록</button>
        <a href="https://my.ozcodingschool.site/mypage">
          <button className={USER_MENU_BTN_STYLE}>마이페이지</button>
        </a>
        <button className={USER_MENU_BTN_STYLE}>로그아웃</button>
      </div>
    </div>
  )
}

export default UserMenu
