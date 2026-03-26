import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, Pencil } from 'lucide-react'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import { SearchBar } from '../components/SearchBar'
import { Button } from '../components/Button'
import { usePosts, usePostCategories } from '../hooks/queries/usePostQueries'
import CategoryFilterBar from '../components/CategoryFilterBar'
import { cn } from '../lib/utils'

export interface PostListParams {
  categoryId?: number
  sort?: 'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
  search?: string
  page?: number
  pageSize?: number
}

export interface Post {
  id: number
  author: {
    id: number
    nickname: string
    profile_img_url: string
  }
  category: {
    id: number
    name: string
  }
  title: string
  thumbnail_img_url: string | null
  content_preview: string
  comment_count: number
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
}

export interface PostListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

function PostList() {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<
    'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
  >('latest')

  const [searchType, setSearchType] = useState('제목')
  const [isSearchTypeOpen, setIsSearchTypeOpen] = useState(false)
  const searchOptions = ['제목', '내용', '작성자']

  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortList = [
    { label: '조회순', value: 'most_views' },
    { label: '좋아요 순', value: 'most_likes' },
    { label: '댓글 순', value: 'most_comments' },
    { label: '최신순', value: 'latest' },
    { label: '오래된 순', value: 'oldest' },
  ]

  const currentSortLabel =
    sortList.find((item) => item.value === sort)?.label || '최신순'

  const { data: categoryData } = usePostCategories()
  const categories = categoryData
    ? [{ id: 0, name: '전체' }, ...categoryData]
    : [{ id: 0, name: '전체' }]

  const [currentCategory, setCurrentCategory] = useState(categories[0])

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      const selected =
        categoryData.find((c) => c.id === categoryId) || categories[0]
      setCurrentCategory(selected)
    }
  }, [categoryData, categoryId])

  // 게시글 목록 조회
  const { data, isLoading } = usePosts({
    page,
    page_size: 10,
    search,
    category_id: categoryId === 0 ? undefined : categoryId,
    sort,
  })

  // 실서버 응답 구조(results)에 맞춰 데이터 추출
  const posts = (data as any)?.results ?? []

  // 전체 게시글 수 기반 페이지 계산
  const totalPages = Math.ceil(((data as any)?.count ?? 0) / 10)

  return (
    <div className="flex w-full justify-center pt-56">
      <div className="flex w-236 flex-col gap-13">
        {/* 타이틀 */}
        <h1 className="text-text-main text-3xl leading-10 font-bold">
          커뮤니티
        </h1>

        {/* 검색 영역 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchTypeOpen(!isSearchTypeOpen)}
                className="flex h-10 cursor-pointer items-center gap-2 px-2 outline-none"
              >
                <span className="text-16 text-text-sub font-medium">
                  {searchType}
                </span>
                <ChevronDown
                  className={cn(
                    'text-text-sub size-5 transition-transform',
                    isSearchTypeOpen && 'rotate-180'
                  )}
                />
              </button>

              {isSearchTypeOpen && (
                <div className="absolute top-11 left-0 z-50 flex w-36 flex-col rounded-3xl border border-gray-100 bg-white p-2 shadow-xl outline-none">
                  {searchOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSearchType(option)
                        setIsSearchTypeOpen(false)
                      }}
                      className={cn(
                        'flex h-12 w-full items-center justify-center rounded-2xl px-4 text-center text-base transition-colors hover:bg-gray-50',
                        searchType === option
                          ? 'text-primary-default bg-purple-50 font-bold'
                          : 'text-text-main'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-118">
              <SearchBar value={search} onValueChange={setSearch} />
            </div>
          </div>

          {/* 글쓰기 */}
          <Button
            onClick={() => navigate('/posts/create')}
            className="flex h-12 w-30 items-center justify-center gap-2 whitespace-nowrap"
          >
            <Pencil className="size-4" />
            글쓰기
          </Button>
        </div>

        {/* 카테고리 + 정렬 */}
        <div className="border-gray-250 flex items-center justify-between border-b pb-3">
          <CategoryFilterBar
            currentCategory={currentCategory}
            onCategoryClick={(cat) => {
              setCurrentCategory(cat)
              setCategoryId(cat.id === 0 ? undefined : cat.id)
            }}
            categoryList={categories}
          />

          {/* 정렬 드롭다운 리스트 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 px-2 outline-none"
            >
              <span className="text-16 text-text-main font-medium">
                {currentSortLabel}
              </span>
              <span className="text-16 text-text-main">↓↑</span>
            </button>

            {isSortOpen && (
              <div className="absolute top-10 right-0 z-50 flex w-40 flex-col rounded-[24px] border border-gray-100 bg-white p-2 shadow-xl outline-none">
                {sortList.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSort(item.value as any)
                      setIsSortOpen(false)
                    }}
                    className={cn(
                      'flex h-12 w-full items-center justify-center rounded-[16px] px-4 text-center text-base transition-colors',
                      sort === item.value
                        ? 'text-primary-default bg-purple-50 font-bold'
                        : 'text-text-main hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 게시글 리스트 */}
        <div className="border-gray-250 border-t border-b">
          <div className="flex flex-col">
            {isLoading ? (
              <div className="text-14 text-text-light py-12 text-center">
                로딩 중...
              </div>
            ) : posts.length > 0 ? (
              posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/posts/${post.id}`)}
                />
              ))
            ) : (
              <div className="text-14 text-text-light py-12 text-center">
                게시글이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="mt-3 mb-52">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default PostList
