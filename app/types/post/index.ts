interface UserPost {
  surname: String
}

export interface PostProps {
  title: String
  article: String
}
export interface PostType extends PostProps {
  id: number
  user: UserPost
}

export interface PostDescriptionType {
  id: number
  description: String
  user: UserPost
}

export interface PostLike {
  id: number
  user: UserPost
}

export interface PostLikeType {
  data: PostLike[]
  count: Number
}
