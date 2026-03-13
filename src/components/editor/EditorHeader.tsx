import { Button } from '../Button'
import profileImg from '../../assets/images/profile-purple.png'

export default function EditorHeader() {
  return (
    <div className="flex h-full w-full items-center justify-between px-10">
      <div className="flex items-center gap-3">
        {' '}
        {/* 프로필 사진 */}
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img
            src={profileImg}
            className="h-full w-full object-cover"
            alt="profile"
          />
        </div>
        {/* 텍스트 레이아웃 */}
        <div className="flex flex-col gap-0.5">
          <p className="text-primary-default text-xs leading-tight font-normal tracking-tighter">
            오즈오즈 님,
          </p>
          <h2 className="text-lg leading-tight font-semibold tracking-tighter text-gray-800">
            정보를 공유해 주세요.
          </h2>
        </div>
      </div>

      {/* btn_답변하기 */}
      <Button
        variant="fill"
        size="default"
        shape="round"
        className="h-12 w-28 text-base font-semibold"
      >
        답변하기
      </Button>
    </div>
  )
}
