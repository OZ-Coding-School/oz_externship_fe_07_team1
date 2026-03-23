import { delay, http, HttpResponse } from 'msw'
import type { PreSignedUrlResponse } from '../../types/api-response-types/image'

const getPresignedUrlMOCK = http.put(
  `/qna/questions/presigned-url`,
  async ({ request }) => {
    await delay(500)

    const body = await request.json()

    if (!body) {
      return HttpResponse.json(
        { error_detail: '지원하지 않는 파일 형식입니다.' },
        { status: 400 }
      )
    }

    const response: PreSignedUrlResponse = {
      presigned_url: `https://fake/presigned_url/file_name`,
      img_url: `https://placehold.co/600x400?text=fake-image.png`,
      key: `key/file_name`,
    }

    return HttpResponse.json(response, { status: 200 })
  }
)

const uploadImageToS3MOCK = http.put(
  `https://fake/presigned_url/file_name`,
  async () => {
    await delay(500)

    return HttpResponse.json({ status: 200 })
  }
)

export { getPresignedUrlMOCK, uploadImageToS3MOCK }
