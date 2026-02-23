import { Post } from "../generated/prisma/client";


export type PostWithAuthor = Post & {
  author: {
    id: string
    name: string | null
    image: string | null
  }
  isLikedByCurrentUser: boolean;
  _count: {
    likes: number;
    comments: number;
  }
}


export interface CreatePostProps {
  onClose: () => void
  show: boolean
  onPostCreated: () => void
  mode?: 'create' | 'edit'
  postId?: string
  initialContent?: string
  initialImage?: string | null
}
