import type { GetPostDetailResponse } from '../../types'

export const mockPostDetailData: GetPostDetailResponse = {
  id: 1, // 게시글 번호
  title: '러닝 메이트 함께해요.',
  author: {
    id: 2, // 작성자 ID
    nickname: '김태산', // 닉네임
    profile_img_url: '', // 기본 프로필 이미지 URL
  },
  category: {
    id: 3,
    name: '구인/협업', // 카테고리
  },
  // 본문 내용
  content:
    'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77\n\n함께 열공해요',
  view_count: 60, // 조회수
  like_count: 2, // 좋아요

  created_at: '2025-06-12T19:00:00+09:00', // 15시간 전
  updated_at: '2025-06-12T19:00:00+09:00',
}
