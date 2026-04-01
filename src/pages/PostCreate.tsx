import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import { useCreatePost, usePostCategories } from '../hooks'
import type { CreatePostRequest } from '../types'
import { categoryData } from '../mocks/data/categoryData'
import { useAccessTokenStore } from '../store/useAccessTokenStore'

const initialContent = ''

function PostCreate() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(initialContent)
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const navigate = useNavigate()

  const accessToken = useAccessTokenStore((state) => state.accessToken)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (!accessToken) {
      window.location.href = 'https://my.ozcodingschool.site/login'
    }
  }, [isHydrated, accessToken])

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
