import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, Pencil } from 'lucide-react'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import { SearchBar } from '../components/SearchBar'
import { Button } from '../components/Button'
import { usePosts, usePostCategories } from '../hooks/queries/usePostQueries'
import CategoryFilterBar from '../components/CategoryFilterBar'
import SortButton from '../components/community/SortButton'

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
  const [categoryId, setCategoryId] = useState(0)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<
    'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'
  >('latest')

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

  const sortList = [
    { label: '최신순', value: 'latest' },
    { label: '조회순', value: 'most_views' },
    { label: '좋아요 순', value: 'most_likes' },
    { label: '댓글 순', value: 'most_comments' },
  ]

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
            <div className="flex h-10 items-center gap-2 px-2">
              <span className="text-16 text-text-sub">검색 유형</span>
              <ChevronDown className="text-text-sub size-5" />
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
              setCategoryId(cat.id)
            }}
            categoryList={categories}
          />

          {/* 정렬 버튼 리스트 */}
          <div className="flex items-center gap-1">
            {sortList.map((item) => (
              <SortButton
                key={item.value}
                isActive={sort === item.value}
                onClick={() => setSort(item.value as typeof sort)}
              >
                {item.label}
              </SortButton>
            ))}
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
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default PostList
