import axios from 'axios'
import { instance } from './instance'
import type { PreSignedUrlResponse } from '../types/api-response-types/image'

// Presigned URL 발급 요청
async function getPresignedUrlAPI(fileName: string) {
  const response = await instance.put<PreSignedUrlResponse>(
    '/qna/questions/presigned-url',
    {
      file_name: fileName,
    }
  )
  return response.data
}

// Presigned URL을 이용해 S3에 이미지 업로드
async function uploadImageToS3(presignedUrl: string, file: File) {
  const response = await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
  return response.data
}

export { getPresignedUrlAPI, uploadImageToS3 }
