"use client";

import { PostComment, PostWithAuthor } from "@/app/__types";
import { timeAgo } from "@/lib/timeCalc";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import CommentSkeleton from "@/skeletons/CommentSkeleton";
import PostSkeleton from "@/skeletons/PostSkeleton";
import { useUserStore } from "@/store/userStore";
import AvatarLik from "@/app/__components/nav/NavLink";


export default function CommentsPage() {

    const { id } = useParams() as { id: string };
    const [comments, setComments] = useState<PostComment[]>([]);
    const [post, setPot] = useState<PostWithAuthor>();
    const [isPending, startTransition] = useTransition();

    const user = useUserStore(state => state.user)

    const fetchComments = async () => {
        
        try {
             startTransition(async () => {  
                 const postRes = await fetch(`/api/posts/${id}`)
                  if (!postRes.ok) throw new Error("Failed to fetch");

                  const postData = await postRes.json();
                  setPot(postData)

                  const commentRes = await fetch(`/api/comments?postId=${id}`);
                  if (!commentRes.ok) throw new Error("Failed to fetch");

                  const data = await commentRes.json();
                  setComments(data)

             })
        } catch (error) {
            toast.error("Something went wrong")
        }       

  };


  useEffect(() => {
    fetchComments();
  }, [id]);


  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Original Post */}
        {isPending ? <PostSkeleton />  : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-4 shadow-xl">

          {/* Post Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-4">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                <Image
                      src={post?.author?.image || "/default-avatar.png"}
                      alt={post?.author?.name || "User name"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">{post?.author?.name}</p>
              <p className="text-xs text-gray-500">{post && timeAgo(post.createdAt)}</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-5 pb-4">
            <p className="text-sm text-gray-300 leading-relaxed">{post?.content}</p>
          </div>

          {/* Post Image */}
          {post?.image  &&  (
                <div className="w-full h-64 overflow-hidden border-y border-gray-800">
                    <Image 
                        src={post?.image || "/default-avatar.png"} 
                        alt="post" width={800} 
                        height={400} 
                        className="w-full h-full object-cover" 
                    />
              </div>
          )}

          {/* Counts */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-800">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                <AiFillLike className="text-gray-900 text-[10px]" />
              </span>
              <span className="text-xs text-gray-500">{post?._count?.likes} Likes</span>
            </div>
            <span className="text-xs text-gray-500">{post?._count?.comments} Comments</span>
          </div>

        </div>
        )}

        {/* Comments Section */}


         {isPending ? <CommentSkeleton /> : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">

          <div className="px-5 pt-5 pb-4 border-b border-gray-800">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-0.5">
              Discussion
            </p>
            <h2 className="text-base font-semibold text-gray-100">
              {comments.length} Comments
            </h2>
          </div>

          <div className="px-5 py-5 space-y-5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">

                {/* Avatar */}
                <div className="shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700">
                    <Image
                      src={comment.author.image}
                      alt={comment.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bubble */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-800 border border-gray-700/60 rounded-2xl rounded-tl-sm px-4 py-3 group-hover:border-gray-600 transition-colors duration-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-200">{comment.author.name}</span>
                      <span className="text-xs text-gray-600">{timeAgo(comment.updatedAt)}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{comment.content}</p>
                  </div>                  
                </div>

              </div>
            ))}
          </div>

          <div className="px-5 pb-5 pt-2 border-t border-gray-800">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 shrink-0 flex items-center justify-center text-amber-500 text-sm font-light select-none">
                 <AvatarLik href={`/profile`} image={user?.image || "default-avatar.png"} />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-2.5 pr-12 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-400 transition-all duration-200 active:scale-95">
                  <svg className="w-3.5 h-3.5 text-gray-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
         )}
        

      </div>
    </div>
  );
}