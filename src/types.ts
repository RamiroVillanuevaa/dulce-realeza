export interface User {
  id: number
  nickName: string
  email: string
}

export interface Tag {
  id: number
  name: string
}

export interface Post {
  id: number
  description: string
  createdAt: string
  UserId: number
  User?: User
  Tags?: Tag[]
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  PostId: number
  UserId: number
  User?: User
}

export interface PostImage {
  id: number
  url: string
  PostId: number
}
