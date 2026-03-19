import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import EditorHeader from '../components/editor/EditorHeader'
import MarkdownEditor from '../components/editor/MarkdownEditor/MarkdownEditor'
import { Button } from '../components/Button'
import { usePostCategories, usePostDetail, useUpdatePost } from '../hooks'
import { categoryData } from '../mocks/data/categoryData'

function PostEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const { data } = usePostCategories()
  const categories = data?.length ? data : categoryData

  const { data: postDetail } = usePostDetail(id as string)
  const { mutate: updatePost } = useUpdatePost()

  useEffect(() => {
    if (!postDetail) return
    // 기존 게시글 데이터 불러오기
    setTitle(postDetail.title)
    setContent(postDetail.content)
    setCategoryId(postDetail.category?.id ?? postDetail.category_id)
  }, [postDetail])

  const handleSubmit = () => {
    if (!categoryId) return

    updatePost(
      {
        postId: id as string,
        params: {
          title,
          content,
          category_id: categoryId,
        },
      },
      {
        onSuccess: () => {
          // 수정 완료 후 상세 페이지로 이동 (임시)
          navigate(`/posts/${id}`)
        },
      }
    )
  }

  return (
    <div className="bg-surface-default flex w-full justify-center pt-27 pb-38">
      <div className="flex w-59 flex-col gap-4">
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
          <Button type="submit" onClick={handleSubmit}>
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostEdit
