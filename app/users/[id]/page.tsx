"use client";

import CreatePost from "@/app/__components/post/CreatePost";
import PostCard from "@/app/__components/post/Post";
import PostSkeleton from "@/skeletons/PostSkeleton";
import { usePostsStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserPage = () => {
    const user = useUserStore((state) => state.user);
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
  }, [user?.id]);

  return (
    <div className="container my-10">
      <CreatePost
        show={showCreatePost || !!editPost}
        onClose={() => { setShowCreatePost(false); setEditPost(null) }}
        onPostCreated={() => fetchUserPosts(user?.id || "")}
        mode={editPost ? 'edit' : 'create'}
        postId={editPost?.id}
        initialContent={editPost?.content}
        initialImage={editPost?.image}
      />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 h-[calc(100vh-65px)] md:sticky top-10">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="User profile image"
            className="w-44 h-44 rounded-full object-contain border-3 border-white mb-4"
            width={176}
            height={176}
          />

          <div className="text-text-color bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-3xl mb-3"> {user?.name} </h2>
            <p className="mb-1 text-xl"> Bio: This is a sample user bio. </p>
            <p className="mb-1 text-xl"> Email: {user?.email} </p>
            <p className="mb-1 text-xl"> Location: Sample City </p>
            <p className="mb-1 text-xl"> phone: 123-456-7890 </p>
          </div>
        </div>

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
                    onEdit={(post: any) => setEditPost({ id: post.id, content: post.content, image: post.image })}
                />
              ))
            )}

            {!loading && posts.length === 0 && (
              <p className="text-center p-5 rounded-md mt-10 w-full bg-white text-(--secondary-color) text-xl">No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
