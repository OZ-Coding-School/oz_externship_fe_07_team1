import { cn } from '../lib/utils'

interface StatusDisplayProps {
  variant: 'loading' | '404' | 'exam' | 'qna' | 'community'
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
      <style>
        {`
          @keyframes crisp-bounce {
            0%, 40%, 100% { transform: translateY(0); }
            20% { transform: translateY(-6px); } 
          }
          .dot-wave {
            animation: crisp-bounce 1.4s infinite ease-in-out;
          }
        `}
      </style>

      <circle
        cx="8"
        cy="24"
        r="4"
        fill="currentColor"
        className="dot-wave"
        style={{ animationDelay: '0s' }}
      />
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="currentColor"
        className="dot-wave"
        style={{ animationDelay: '0.2s' }}
      />
      <circle
        cx="40"
        cy="24"
        r="4"
        fill="currentColor"
        className="dot-wave"
        style={{ animationDelay: '0.4s' }}
      />
    </svg>
  )
}

export const StatusDisplay = ({ variant, message }: StatusDisplayProps) => {
  const configs = {
    loading: <LoadingWaveIcon />,
    '404': <img src="/images/cloud-404.svg" alt="페이지를 찾을 수 없습니다" />,
    exam: <img src="/images/exam-empty.svg" alt="응시할 시험이 없습니다" />,
    qna: <img src="/images/qna-empty.svg" alt="등록된 질문이 없습니다" />,
    community: (
      <img src="/images/community-empty.svg" alt="올라온 글이 없습니다" />
    ),
  }

  return (
    <div className="flex w-full items-center justify-center py-20">
      <div>{configs[variant]}</div>

      {message && (
        <div
          className={cn(
            'mt-4 text-center text-sm font-medium whitespace-pre-wrap text-gray-500'
          )}
        >
          {message}
        </div>
      )}
    </div>
  )
}
