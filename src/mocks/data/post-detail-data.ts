import type { PostDetailResponse } from '../../types'

export const mockPostDetailData: PostDetailResponse = {
  id: 1,
  title: '러닝 메이트 함께해요.',
  author: {
    id: 2,
    nickname: '김태산',
    profile_img_url: '',
  },

  category: {
    id: 3,
    name: '운동/러닝',
  },

  content:
    'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77\n\n함께 열공해요',

  view_count: 60,
  like_count: 2,

  created_at: '2025-06-12T19:00:00+09:00',
  updated_at: '2025-06-12T19:00:00+09:00',
}
