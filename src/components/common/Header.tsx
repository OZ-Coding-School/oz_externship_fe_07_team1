import { Link } from 'react-router'
import Logo from '../../assets/images/logo.png'
import { useAccessTokenStore } from '../../store/useAccessTokenStore'
import { User } from 'lucide-react'
import { useState } from 'react'
import UserMenu from '../user/UserMenu'
import { useUserInfoStore } from '../../store/useUserInfoStore'

function Header() {
  const [isProfileImgToggled, setIsProfileImgToggled] = useState(false)
  const { accessToken } = useAccessTokenStore()
  const { userInfo } = useUserInfoStore()

  return (
    <header className="border-b border-gray-200">
      <section className="flex h-12 w-full items-center justify-center bg-gray-800 text-base text-white">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </section>

      <section className="flex h-16 w-full min-w-170 items-center justify-between px-10 text-lg whitespace-nowrap text-gray-600 md:px-20 xl:px-90">
        <div className="flex items-center gap-15">
          <h1 className="shrink-0">
            <img className="h-auto w-30 object-contain" src={Logo} alt="logo" />
          </h1>

          <nav aria-label="주요 메뉴">
            <ul className="flex gap-15">
              <li className="py-4">
                <Link to="/posts">커뮤니티</Link>
              </li>
              <li className="py-4">
                <a href="https://qna.ozcodingschool.site">질의응답</a>
              </li>
            </ul>
          </nav>
        </div>

        {accessToken ? (
          <div className="relative size-10">
            <button
              className="bg-primary-100 relative size-full cursor-pointer rounded-full"
              onClick={() => setIsProfileImgToggled((prev) => !prev)}
            >
              {userInfo?.profileImgUrl ? (
                <img
                  src={userInfo.profileImgUrl}
                  alt={userInfo.name}
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <User className="text-primary-400 b-0 absolute bottom-0 left-1/2 size-8 -translate-x-1/2" />
              )}
            </button>
            {isProfileImgToggled && (
              <UserMenu
                userInfo={userInfo}
                className="absolute top-16 left-0"
              />
            )}
          </div>
        ) : (
          <nav aria-label="사용자 메뉴">
            <ul className="flex items-center gap-2">
              <li className="py-4">
                <a href="https://my.ozcodingschool.site/login">로그인</a>
              </li>
              <li className="text-xl">|</li>
              <li className="py-4">
                <a href="https://my.ozcodingschool.site/signup">회원가입</a>
              </li>
            </ul>
          </nav>
        )}
      </section>
    </header>
  )
}

export default Header
