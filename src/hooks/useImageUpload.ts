import { useEffect, useState } from 'react'
import { getPresignedUrlAPI, uploadImageToS3 } from '../api/imageAPI'
import { useToast } from './useToast'

export function useImageUpload(file: File | null) {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string>('')
  const { showToast } = useToast()

  useEffect(() => {
    if (isUploading || !file) return

    const handleImageUpload = async () => {
      try {
        setIsUploading(true)
        const { presigned_url: newPresignedUrl, img_url: newImgUrl } =
          await getPresignedUrlAPI(file.name)
        await uploadImageToS3(newPresignedUrl, file)
        setImgUrl(newImgUrl)
      } catch (err) {
        showToast(
          'default',
          '이미지 업로드 실패',
          '이미지를 다시 업로드해주세요.'
        )
      } finally {
        setIsUploading(false)
      }
    }

    handleImageUpload()
  }, [file])

  return { isUploading, imgUrl }
}
