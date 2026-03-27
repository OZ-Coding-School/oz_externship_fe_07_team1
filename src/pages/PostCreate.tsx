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
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const navigate = useNavigate()

  const { data } = usePostCategories()
  const categories = data?.length ? data : categoryData

  const { mutate: createPost } = useCreatePost()

  const handleSubmit = () => {
    if (!categoryId) {
      alert('카테고리를 선택해주세요.')
      return
    }

    const requestBody: CreatePostRequest = {
      title,
      content,
      category_id: categoryId,
    }

    createPost(requestBody, {
      onSuccess: (res: any) => {
        // 수정: 등록 성공 후 ID가 있으면 상세로, 없으면 목록(/posts)으로 이동
        const newId = res?.id || res?.post_id || res?.data?.id

        if (newId) {
          navigate(`/posts/${newId}`)
        } else {
          navigate('/posts')
        }
      },
    })
  }

  return (
    <div className="bg-surface-default flex w-full justify-center py-20">
      <div className="flex w-236 flex-col gap-12">
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
