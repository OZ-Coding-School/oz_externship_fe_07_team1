import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPostDetailAPI, likePostAPI } from '../../api/postAPI'

export function usePostDetail(postId: number) {
  return useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetailAPI(postId),
  })
}

export function useLikePost(postId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => likePostAPI(postId),
    onSuccess: () => {
      // 좋아요 성공 시 게시글 상세 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
    },
  })
}
