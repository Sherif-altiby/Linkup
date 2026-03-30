"use client";

import { PostWithAuthor } from "../../__types";
import PostDropdownMenu from "./PostDropdownMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import PostImage from "./PostImage";
import PostReaches from "./PostReaches";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import Image from "next/image";

export default function PostCard({
  post,
  fetchPosts,
  onEdit,
  isRepost,
  originalPost,
}: {
  post: PostWithAuthor;
  fetchPosts?: () => void;
  onEdit?: (post: any) => void;
  isRepost: boolean;
  originalPost: string;
}) {
  const [show, setShow] = useState(false);

  const [likeCount, setLikeCount] = useState(post?._count?.likes || 0);
  const [comentCount, setCommentCont] = useState(post?._count?.comments || 0);

  const user = useUserStore((state) => state.user);

  const [isCurrentUserLikedPost, setIsCurrentUserLikedpost] = useState(false);

  useEffect(() => {
    setIsCurrentUserLikedpost(
      post.likes?.some((like) => like.userId === user?.id),
    );
  }, [user]);

  const handlePostDelete = async (postId: string) => {
    try {
      const res: any = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(res.message || "Post deleted successfully!");
        fetchPosts && fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setLikeCount((prev: number) => (data.liked ? prev + 1 : prev - 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full  mx-auto   border-gray-800 rounded-2xl shadow-xl mb-5 overflow-hidden relative  bg-gray-900 border`}
    >

      {isRepost && (<div className="flex items-center border-b py-3 gap-1 px-4 border-gray-800" > 
        <div className="flex items-center gap-2" >
           <div className="size-8 rounded-full" >
            <Image
                src={post.author.image || "default-avatar.png"}
                alt="Image Author"
                width={40}
                height={40}
                className="rounded-full object-cover"
            />
         </div>
          <h3> {post.author.name} </h3>
        </div>
         <p className="text-ms text-gray-600" > Reposted this </p>
      </div>)}

      <PostDropdownMenu
        id={post.author.id}
        show={show}
        onClose={() => setShow(false)}
        onPostDeleted={() => handlePostDelete(post.id)}
        onEdit={() => {
          onEdit && onEdit(post);
          setShow(false);
        }}
      />

      <PostHeader
        authorId={post.author.id}
        authorImg={(isRepost ? post.originalPost.author.image  : post.author.image) || "default-avatar.png"}
        authorName={(isRepost ? post.originalPost.author.name : post.author.name) || "author name"}
        postTime={post.createdAt}
        setShow={setShow}
      />

      {/* Content */}
      <div className="px-5 pb-4">
        <p className="text-gray-300 text-sm leading-relaxed">{ isRepost ? post.originalPost.content :  post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && <PostImage  image={post.image} />}

      {post.originalPost?.image && <PostImage  image={post.originalPost.image} />}


      {/* Like / Comment counts */}
      {(likeCount > 0 || comentCount > 0) && (
        <PostReaches
          comments={comentCount}
          likes={likeCount}
          postId={post.id}
        />
      )}

      {/* Actions */}
      <PostActions
        handleLike={handleLike}
        isCurrentUserLikedPost={isCurrentUserLikedPost}
        setIsCurrentUserLikedpost={setIsCurrentUserLikedpost}
        postId={post.id}
      />
    </div>
  );
}
