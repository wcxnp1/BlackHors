//请求

export type requestEmptyObject = {
  password: string
  username: string
}

//响应
export type EmptyObject = {
  code: number
  data: Data
  msg: string
}

export type Data = {
  token: string
}
