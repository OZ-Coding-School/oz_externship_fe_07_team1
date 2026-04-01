// src/pages/PostList.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, Pencil, ArrowUpDown } from 'lucide-react'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import { SearchBar } from '../components/SearchBar'
import { Button } from '../components/Button'
import { usePosts, usePostCategories } from '../hooks/queries/usePostQueries'
import CategoryFilterBar from '../components/CategoryFilterBar'
import { cn } from '../lib/utils'
import { useAccessTokenStore } from '../store/useAccessTokenStore'
import { useToastStore } from '../store/useToastStore'
import { SEARCH_FILTER_LIST, SORT_LIST } from '../constants/postList'
import type {
  PostListParamSearchFilterValueType,
  PostListParamSortValueType,
  PostListType,
} from '../types'

function PostList() {
  const { accessToken } = useAccessTokenStore()
  const { showToast } = useToastStore()

  const isValidToken =
    typeof accessToken === 'string' &&
    accessToken !== 'null' &&
    accessToken !== 'undefined' &&
    accessToken.trim() !== ''

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchFilter, setSearchFilter] = useState<{
    label: string
    value: PostListParamSearchFilterValueType
  }>(SEARCH_FILTER_LIST[0])
  const [sort, setSort] = useState<PostListParamSortValueType>('latest')

  // sort & search filter 모달 토글 관리 상태
  const [isSearchTypeOpen, setIsSearchTypeOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const navigate = useNavigate()

  const currentSortLabel =
    SORT_LIST.find((item) => item.value === sort)?.label || '최신순'

  const { data: categoryData } = usePostCategories()
  const categories = categoryData
    ? [{ id: 0, name: '전체' }, ...categoryData]
    : [{ id: 0, name: '전체' }]

  const [currentCategory, setCurrentCategory] = useState({
    id: 0,
    name: '전체',
  })

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      const selected =
        categoryData.find((c) => c.id === categoryId) || categories[0]
      setCurrentCategory(selected)
    }
  }, [categoryData, categoryId])

  const { data, isLoading } = usePosts({
    categoryId: categoryId === 0 ? undefined : categoryId,
    page,
    pageSize: 10,
    search,
    searchFilter: searchFilter.value,
    sort,
  })

  const posts = data?.results ?? []
  const totalPages = Math.ceil((data?.count ?? 0) / 10)

  return (
    <div className="flex w-full justify-center pt-56">
      <div className="flex w-236 flex-col gap-12">
        <h1 className="text-text-main text-3xl leading-10 font-bold">
          커뮤니티
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchTypeOpen(!isSearchTypeOpen)}
                className="flex h-10 cursor-pointer items-center gap-2 px-2 outline-none"
              >
                <span className="text-16 text-text-sub font-medium">
                  {searchFilter.label}
                </span>
                <ChevronDown
                  className={cn(
                    'text-text-sub size-5 transition-transform',
                    isSearchTypeOpen && 'rotate-180'
                  )}
                />
              </button>

              {isSearchTypeOpen && (
                <div className="absolute top-11 left-0 z-50 ml-12 flex w-36 flex-col rounded-3xl border border-gray-100 bg-white p-2 shadow-xl outline-none">
                  {SEARCH_FILTER_LIST.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSearchFilter(option)
                        setIsSearchTypeOpen(false)
                      }}
                      className={cn(
                        'flex h-12 w-full items-center justify-center rounded-2xl px-2 text-center text-base transition-colors hover:bg-gray-50',
                        searchFilter === option
                          ? 'text-primary-default bg-purple-50 font-bold'
                          : 'text-text-main'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-118">
              <SearchBar value={search} onValueChange={setSearch} />
            </div>
          </div>

          <Button
            onClick={() => {
              if (!isValidToken) {
                showToast('default', '로그인 필요', '로그인 후 이용 가능합니다')
                return
              }
              navigate('/posts/create')
            }}
            className="flex h-12 w-30 items-center justify-center gap-2 whitespace-nowrap"
          >
            <Pencil className="size-5" />
            글쓰기
          </Button>
        </div>

        <div className="border-gray-250 flex items-center justify-between border-b pb-3">
          <CategoryFilterBar
            currentCategory={currentCategory}
            onCategoryClick={(cat) => {
              setCurrentCategory(cat)
              setCategoryId(cat.id === 0 ? undefined : cat.id)
            }}
            categoryList={categories}
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 px-2 font-normal outline-none"
            >
              <span className="text-text-main text-base">
                {currentSortLabel}
              </span>
              <ArrowUpDown className="size-5" />
            </button>

            {isSortOpen && (
              <div className="absolute top-10 left-1/2 z-50 flex w-40 -translate-x-1/2 flex-col rounded-3xl border border-gray-100 bg-white p-2 shadow-xl outline-none">
                {SORT_LIST.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSort(item.value as any)
                      setIsSortOpen(false)
                    }}
                    className={cn(
                      'flex h-12 w-full items-center justify-center rounded-2xl px-2 text-base transition-colors',
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

        <div className="border-gray-250 border-b">
          <div className="flex flex-col">
            {isLoading ? (
              <div className="text-14 text-text-light py-12 text-center">
                로딩 중...
              </div>
            ) : posts.length > 0 ? (
              posts.map((post: PostListType) => (
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
