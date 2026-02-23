import { PostWithAuthor } from "@/app/__types";
import { create } from "zustand";


type PostsStore = {
  posts: PostWithAuthor[];
  loading: boolean;
  fetchUserPosts: (userId: string) => Promise<void>;
};

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  loading: false,

  fetchUserPosts: async (userId: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      set({ posts: data.posts ?? data });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      set({ loading: false });
    }
  },
}));