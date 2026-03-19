import { useNavigate } from 'react-router'
import { useState } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import { useCreatePost, usePostCategories } from '../hooks'
import type { CreatePostRequest } from '../types'

const initialContent = ''

const fallbackCategories = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '질의응답' },
]

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(initialContent)
  const [categoryId, setCategoryId] = useState<number | null>(
    fallbackCategories[0].id // 기본 카테고리 선택
  )

  const navigate = useNavigate()

  const { data } = usePostCategories()
  const categories = data?.length ? data : fallbackCategories

  const { mutate: createPost } = useCreatePost()

  const handleSubmit = () => {
    if (!categoryId) return

    const requestBody: CreatePostRequest = {
      title,
      content,
      category_id: categoryId,
    }

    createPost(requestBody, {
      onSuccess: (res) => {
        // 작성 완료 후 수정 페이지로 이동 (임시)
        navigate(`/posts/edit/${res.pk}`)
      },
    })
  }

  return (
    <div className="bg-surface-default flex w-full justify-center pt-27 pb-38">
      <div className="flex w-236 flex-col gap-13">
        <EditorHeader
          headerTitle="커뮤니티 게시글 작성"
          title={title}
          onChangeTitle={setTitle}
          onChangeCategoryId={setCategoryId}
          categories={categories}
          selectedCategoryId={categoryId}
        />

        <MarkdownEditor value={content} setValue={setContent} />

        <div className="flex w-full justify-end">
          <Button type="submit" onClick={handleSubmit}>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCreate
