interface GetUserInfoResponse {
  id: number
  email: string
  name: string
  nickname: string
  phoneNumber: string
  gender: 'M' | 'F'
  birthday: string
  profileImgUrl: string
  createdAt: string
  updatedAt: string
}

export type { GetUserInfoResponse }
