import { Comment, Post } from "../generated/prisma/client";

export type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  isLikedByCurrentUser: boolean;
  likes: { userId: string }[];
  _count: {
    likes: number;
    comments: number;
  };
  originalPost: {
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    content: string;
    image: string
  };
  repostingPostId: string
};

export type PostComment = Comment & {
  author: {
    id: string;
    name: string;
    image: string;
  };
};

export interface CreatePostProps {
  onClose: () => void;
  show: boolean;
  onPostCreated: () => void;
  mode?: "create" | "edit";
  postId?: string;
  initialContent?: string;
  initialImage?: string | null;
}
