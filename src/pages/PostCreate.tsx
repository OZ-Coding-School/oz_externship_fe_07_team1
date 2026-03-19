import { useNavigate } from 'react-router'
import { useState } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import { useCreatePost, usePostCategories } from '../hooks'
import type { CreatePostRequest } from '../types'
import { categoryData } from '../mocks/data/categoryData'

const initialContent = ''

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(initialContent)
  const [categoryId, setCategoryId] = useState<number | null>(
    categoryData[0].id
  )

  const navigate = useNavigate()

  const { data } = usePostCategories()
  const categories = data?.length ? data : categoryData

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
      <div className="flex w-59 flex-col gap-4">
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
