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
import AddComment from "./AddComment";
import Link from "next/link";
import AvatarLik from "../nav/NavLink";

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

  const [likeCount, setLikeCount] = useState(post?._count?.likes || 0);
  const [comentCount, setCommentCont] = useState(post?._count?.comments || 0);

  const handlePostDelete = async (postId: string) => {
    try {
      const res: any = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
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
    <div className="w-full  mx-auto bg-gray-900 border border-gray-800 rounded-2xl shadow-xl mb-5 overflow-hidden relative">
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

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
             <AvatarLik href={`/users/${post.authorId}`} image={post.author.image || "default-avatar.png"} />         
          <div>
            <h3 className="font-semibold text-gray-100 text-sm leading-tight">
              {post.author.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200 text-lg leading-none"
          onClick={() => setShow((prev) => !prev)}
        >
          •••
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative w-full h-72 overflow-hidden border-y border-gray-800">
          <Image
            src={post.image}
            alt="post image"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            width={800}
            height={400}
          />
        </div>
      )}

      {/* Like / Comment counts */}
      {(likeCount > 0 || comentCount > 0) && (
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-800">
          {post?._count?.likes > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                <AiFillLike className="text-gray-900 text-[10px]" />
              </span>
              <span className="text-xs text-gray-500">
                {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </span>
            </div>
          )}
          {post._count.comments > 0 && (
            <Link href={`comments/${post.id}`} className="text-xs text-gray-500 ml-auto">
              {post._count.comments} {post._count.comments === 1 ? "Comment" : "Comments"}
            </Link>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center px-3 py-1">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-800 ${
            post.isLikedByCurrentUser ? "text-amber-500" : "text-gray-500 hover:text-amber-500"
          }`}
        >
          <AiFillLike className="text-base" />
          <span>Like</span>
        </button>

        <button
          onClick={() => setShowAddComment((prev) => !prev)}
          className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-800 hover:text-amber-500 ${
            showAddComment ? "text-amber-500" : "text-gray-500"
          }`}
        >
          <FaCommentDots className="text-base" />
          <p >Comment</p>
        </button>

        <button className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-800 hover:text-amber-500 transition-all duration-200">
          <BiRepost className="text-lg" />
          <span>Repost</span>
        </button>
      </div>

      {/* Add Comment */}
      {showAddComment && (
        <div className="border-t border-gray-800 px-5 py-4">
          <AddComment postId={post.id} />
        </div>
      )}
    </div>
  );
}