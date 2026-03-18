import { useNavigate } from 'react-router'
import { useState } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import { useCreatePost, usePostCategories } from '../hooks'
import type { CreatePostRequest } from '../types'

const initialContent = ''

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(initialContent)
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const navigate = useNavigate()

  const { data: categories = [] } = usePostCategories()
  const { mutate: createPost } = useCreatePost()

  const handleSubmit = () => {
    if (!categoryId) return

    const requestBody: CreatePostRequest = {
      title,
      content,
      category_id: categoryId,
    }

    createPost(requestBody, {
      onSuccess: () => {
        navigate('/posts')
      },
    })
  }

  return (
    <div className="bg-surface-default flex w-full justify-center pt-27 pb-38">
      <div className="flex w-236 flex-col gap-13">
        <EditorHeader
          title={title}
          onChangeTitle={setTitle}
          onChangeCategoryId={setCategoryId}
          categories={categories}
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
