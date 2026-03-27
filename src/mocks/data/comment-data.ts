import type { GetCommentsResponse } from '../../types'

export const mockCommentsData: GetCommentsResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      post: 1,
      author: 1,
      nickname: 'jnubugo',
      content: '좋아요',
      created_at: '2025-06-13T10:00:00+09:00',
      updated_at: '2025-06-13T10:00:00+09:00',
    },
    {
      id: 2,
      post: 1,
      author: 2,
      nickname: 'name2',
      content: '굿굿',
      created_at: '2025-06-13T11:00:00+09:00',
      updated_at: '2025-06-13T11:00:00+09:00',
    },
  ],
}
