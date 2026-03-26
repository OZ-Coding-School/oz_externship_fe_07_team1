import { useNavigate, useParams, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import {
  usePostCategories,
  usePostDetail,
  useUpdatePost,
  useToast,
} from '../hooks'
import { categoryData } from '../mocks/data/categoryData'

function PostEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()

  const postId = Number(id)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const { data } = usePostCategories()
  const categories = data?.length ? data : categoryData

  const { data: postDetail } = usePostDetail(postId)
  const { mutate: updatePost } = useUpdatePost()

  const state = location.state as
    | {
        title?: string
        content?: string
        category_id?: number
      }
    | undefined

  useEffect(() => {
    if (state) {
      setTitle(state.title ?? '')
      setContent(state.content ?? '')
      setCategoryId(state.category_id ?? null)
      return
    }

    if (!postDetail) return

    setTitle(postDetail.title)
    setContent(postDetail.content)
    setCategoryId(postDetail.category?.id ?? null)
  }, [postDetail, state])

  const handleSubmit = () => {
    if (!postId || Number.isNaN(postId)) return

    if (!categoryId) {
      showToast('default', '입력 오류', '카테고리를 선택해주세요.')
      return
    }

    if (!title.trim()) {
      showToast('default', '입력 오류', '제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      showToast('default', '입력 오류', '내용을 입력해주세요.')
      return
    }

    updatePost(
      {
        postId: String(postId),
        params: {
          title,
          content,
          category_id: categoryId,
        },
      },
      {
        onSuccess: () => {
          navigate(`/posts/${postId}`)
        },
      }
    )
  }

  if (!postId || Number.isNaN(postId)) return null

  return (
    <div className="bg-surface-default flex w-full justify-center py-20">
      <div className="flex w-236 flex-col gap-12">
        <EditorHeader
          headerTitle="커뮤니티 게시글 수정"
          title={title}
          onChangeTitle={setTitle}
          onChangeCategoryId={setCategoryId}
          categories={categories}
          selectedCategoryId={categoryId}
        />

        <MarkdownEditor value={content} setValue={setContent} />

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-default hover:bg-primary-hover active:bg-primary-active rounded-4 h-12 w-32 text-white"
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostEdit
