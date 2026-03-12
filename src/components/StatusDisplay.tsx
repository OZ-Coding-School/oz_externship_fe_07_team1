import { cn } from '../lib/utils'
import CloudIcon from '../assets/images/cloud-404.svg?react'
import CommunityIcon from '../assets/images/community-empty.svg?react'
interface StatusDisplayProps {
  variant: 'loading' | '404' | 'community'
  title?: string
  message?: string | React.ReactNode
}

const LoadingWaveIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary-default"
    >
      <circle
        cx="8"
        cy="24"
        r="4"
        fill="currentColor"
        className="animate-crisp-bounce"
        style={{ animationDelay: '0s' }}
      />
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="currentColor"
        className="animate-crisp-bounce"
        style={{ animationDelay: '0.2s' }}
      />
      <circle
        cx="40"
        cy="24"
        r="4"
        fill="currentColor"
        className="animate-crisp-bounce"
        style={{ animationDelay: '0.4s' }}
      />
    </svg>
  )
}

export const StatusDisplay = ({
  variant,
  message,
  title,
}: StatusDisplayProps) => {
  const configs = {
    loading: { icon: <LoadingWaveIcon />, defaultTitle: '' },
    '404': {
      icon: <CloudIcon />,
      defaultTitle: '페이지를 불러올 수 없어요\n잠시 뒤 다시 시도해보세요!',
    },
    community: {
      icon: <CommunityIcon />,
      defaultTitle: '아직 올라온 글이 없어요\n첫 글을 남겨보세요!',
    },
  }
  const currentConfig = configs[variant]

  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <div>{currentConfig.icon}</div>
      {(title || currentConfig.defaultTitle) && variant !== 'loading' && (
        <div className="text-text-light mt-6 text-center text-xl leading-[1.4] font-normal tracking-tight whitespace-pre-wrap">
          {' '}
          {title || currentConfig.defaultTitle}
        </div>
      )}

      {message && (
        <div
          className={cn(
            'text-text-chatbot mt-4 text-center text-sm font-medium whitespace-pre-wrap'
          )}
        >
          {message}
        </div>
      )}
    </div>
  )
}
