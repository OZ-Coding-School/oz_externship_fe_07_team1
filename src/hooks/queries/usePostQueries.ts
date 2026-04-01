import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import {
  createPostAPI,
  getPostCategoriesAPI,
  getPostDetailAPI,
  updatePostAPI,
  getPostsAPI,
  deletePostAPI,
  likePostAPI,
  unlikePostAPI,
} from '../../api/postAPI'
import { useToast } from '../useToast'
import type {
  CreatePostRequest,
  CreatePostResponse,
  PostCategory,
  PostListParams,
  PostListResponse,
  UpdatePostRequest,
} from '../../types'

// 카테고리 목록 조회
function usePostCategories() {
  return useQuery<PostCategory[]>({
    queryKey: ['postCategories'],
    queryFn: getPostCategoriesAPI,
  })
}

// 게시글 목록 조회
function usePosts(params: PostListParams) {
  const { searchFilter, ...rest } = params

  return useQuery<PostListResponse>({
    queryKey: ['posts', params],
    queryFn: () => {
      const newParams: PostListParams = { ...rest }

      if (rest.search) {
        newParams.searchFilter = searchFilter
      }

      return getPostsAPI({
        category_id: newParams.categoryId,
        page: newParams.page,
        page_size: newParams.pageSize,
        search: newParams.search,
        search_filter: newParams.searchFilter,
        sort: newParams.sort,
      })
    },
  })
}

// 게시글 생성
function useCreatePost() {
  const { showToast } = useToast()

  return useMutation<CreatePostResponse, Error, CreatePostRequest>({
    mutationFn: createPostAPI,
    onSuccess: () => {
      showToast('success', '게시글 등록 완료', '게시글이 등록되었습니다!')
    },
    onError: () => {
      showToast(
        'default',
        '입력 오류',
        '카테고리, 제목, 내용은 필수 입력 사항입니다.'
      )
    },
  })
}

// 게시글 상세 조회
function usePostDetail(postId: number) {
  return useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetailAPI(postId),
    enabled: !!postId,
  })
}

// 게시글 수정
function useUpdatePost() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      params,
    }: {
      postId: string
      params: UpdatePostRequest
    }) => updatePostAPI(postId, params),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', Number(postId)],
      })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showToast('success', '게시글 수정 완료', '게시글이 수정되었습니다!')
    },
    onError: () => {
      showToast(
        'default',
        '게시글 수정 실패',
        '게시글 수정 중 오류가 발생했습니다.'
      )
    },
  })
}

// 게시글 삭제
function useDeletePost() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (postId: number) => deletePostAPI(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showToast('success', '삭제 완료', '게시글이 삭제되었습니다.')
      navigate('/posts')
    },
    onError: () => {
      showToast(
        'default',
        '게시글 삭제 실패',
        '게시글 삭제 중 오류가 발생했습니다.'
      )
    },
  })
}

// 좋아요 토글
function usePostLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => {
      const current = queryClient.getQueryData(['postDetail', postId]) as any
      if (!current) return likePostAPI(postId)
      return current.is_liked ? unlikePostAPI(postId) : likePostAPI(postId)
    },

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ['postDetail', postId] })

      const previousPost = queryClient.getQueryData([
        'postDetail',
        postId,
      ]) as any
      if (!previousPost) return

      const nextLiked = !previousPost.is_liked

      queryClient.setQueryData(['postDetail', postId], {
        ...previousPost,
        is_liked: nextLiked,
        like_count: nextLiked
          ? previousPost.like_count + 1
          : Math.max(0, previousPost.like_count - 1),
      })

      return { previousPost }
    },

    onError: (_, { postId }, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['postDetail', postId], context.previousPost)
      }
    },

    onSettled: () => {},
  })
}

export {
  usePostCategories,
  usePosts,
  useCreatePost,
  usePostDetail,
  useUpdatePost,
  useDeletePost,
  usePostLike,
}
