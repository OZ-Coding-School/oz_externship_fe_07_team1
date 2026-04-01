import type {
  PostListParamSearchFilterType,
  PostListParamSortType,
} from '../types'

export const SORT_LIST: PostListParamSortType[] = [
  { label: '조회순', value: 'most_views' },
  { label: '좋아요순', value: 'most_likes' },
  { label: '댓글순', value: 'most_comments' },
  { label: '최신순', value: 'latest' },
  { label: '오래된순', value: 'oldest' },
]

export const SEARCH_FILTER_LIST: PostListParamSearchFilterType[] = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '작성자', value: 'author' },
  { label: '제목+내용', value: 'title_or_content' },
]
