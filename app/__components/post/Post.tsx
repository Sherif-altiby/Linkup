"use client";

import Image from "next/image";
import { PostWithAuthor } from "../../__types";
import { timeAgo } from "@/lib/timeCalc";
import PostDropdownMenu from "./PostDropdownMenu";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useUserStore } from "@/store/userStore";
import AddComment from "./AddComment";

export default function PostCard({
  post,
  fetchPosts,
  onEdit,
}: {
  post: PostWithAuthor;
  fetchPosts?: () => void;
  onEdit?: (post: any) => void;
}) {


  const [show, setShow] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const user = useUserStore((state) => state.user)

  // Check if current user already liked the post
  const [likeCount, setLikeCount] = useState(post._count.likes || 0)

  const handlePostDelete = async (postId: string) => {
    try {
      const res: any = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
         toast.success(res.message || "Post deleted successfully!");
         fetchPosts && fetchPosts(); // Refetch posts to update UI
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      })
      const data = await res.json()

      if (res.ok) {
        setLikeCount((prev: number) => data.liked ? prev + 1 : prev - 1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm mb-6 p-5 relative">
      <PostDropdownMenu
        id={post.author.id}
        show={show}
        onClose={() => setShow(false)}
        onPostDeleted={() => handlePostDelete(post.id)}
        onEdit={() => {
          onEdit &&  onEdit(post);
          setShow(false);
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={post.author.image || "/default-avatar.png"}
            alt="avatar"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {post.author.name}
            </h3>
            <p className="text-sm text-gray-500"> {timeAgo(post.createdAt)} </p>
          </div>
        </div>

        <button
          className="text-gray-400 hover:text-gray-600 text-xl"
          onClick={() => setShow((prev) => !prev)}
        >
          •••
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

      {/* Post Image */}
      {post.image && (
        <div className="relative w-full h-72 rounded-xl overflow-hidden mb-4">
          <Image
            src={post.image}
            alt="post image"
            className="object-cover w-full h-full"
            width={100}
            height={100}
          />
        </div>
      )}

      {(post._count.likes || post._count.comments) > 0 && (
        
          <div className="flex items-center justify-between" >
              <p className="text-sm text-gray-500 mb-2"> {post._count.likes} {post._count.likes === 1 ? 'Like' : 'Likes'} </p>
              <p className="text-sm text-gray-500 mb-2"> {post._count.comments} {post._count.comments === 1 ? 'Comment' : 'Comments'} </p>
          </div>

      )}
  

      {/* Actions */}
      <div className="flex justify-between border-t pt-3 text-gray-500">
        <button className={`flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center ${post.isLikedByCurrentUser ? 'text-blue-500' : ''}`}
          onClick={handleLike}
        >
          <AiFillLike /> <p> Like </p>
        </button>

        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center"
          onClick={() => setShowAddComment((prev) => !prev)}
        >
          <FaCommentDots /> <p> Comment </p>
        </button>

        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
          <BiRepost /> <p> Repost </p>
        </button>
      </div>

      {showAddComment && <AddComment postId={post.id} />}
    </div>
  );
}
