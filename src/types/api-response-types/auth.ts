interface GetAccessTokenResponse {
  access_token: string
}

interface GetAccessTokenErrorResponse {
  error_detail: {
    refresh_token?: string[]
    detail?: string
  }
}

export type { GetAccessTokenResponse, GetAccessTokenErrorResponse }
