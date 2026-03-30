"use client";

import CreatePost from "@/app/__components/post/CreatePost";
import PostCard from "@/app/__components/post/Post";
import UserInfo from "@/app/__components/user/UserInfo";
import { User } from "@/app/generated/prisma/client";
import PostSkeleton from "@/skeletons/PostSkeleton";
import { usePostsStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

const UserPage = () => {
  const user = useUserStore((state) => state.user as User);
  const { posts, loading, fetchUserPosts } = usePostsStore();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editPost, setEditPost] = useState<{
    id: string;
    content: string;
    image: string | null;
  } | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    fetchUserPosts(user.id);
    console.log(posts)
  }, [user?.id]);

  return (
    <div className="container my-10">
      <CreatePost
        show={showCreatePost || !!editPost}
        onClose={() => {
          setShowCreatePost(false);
          setEditPost(null);
        }}
        onPostCreated={() => fetchUserPosts(user?.id || "")}
        mode={editPost ? "edit" : "create"}
        postId={editPost?.id}
        initialContent={editPost?.content}
        initialImage={editPost?.image}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <UserInfo user={user}/>

        <div className="md:w-1/2">
          <button
            className="mb-5  w-40 bg-secondary-color p-2 rounded-md text-white text-xl cursor-pointer"
            onClick={() => setShowCreatePost(true)}
          >
            Create Post
          </button>

          <div>
            {loading === true ? (
              <PostSkeleton />
            ) : (
              posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={post}
                  fetchPosts={() => fetchUserPosts(user?.id || "")}
                  isRepost={!!post.repostingPostId}
                  originalPost={post.originalPost}
                  onEdit={(post: any) =>
                    setEditPost({
                      id: post.id,
                      content: post.content,
                      image: post.image,
                    })
                  }
                /> 
              ))
            )}

            {!loading && posts.length === 0 && (
              <div className="w-full max-w-2xl mx-auto mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-10 flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-200 font-semibold text-base mb-1">
                    No posts yet
                  </p>
                  <p className="text-gray-600 text-sm">
                    When posts are shared, they'll appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
