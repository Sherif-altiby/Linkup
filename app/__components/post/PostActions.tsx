"use client"

import { AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import AddComment from "./AddComment";
import { useState } from "react";
import toast from "react-hot-toast";

const PostActions = ({
  handleLike,
  setIsCurrentUserLikedpost,isCurrentUserLikedPost, postId
}: {
  handleLike: () => void;
  setIsCurrentUserLikedpost: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentUserLikedPost: boolean;
  postId: string
}) => {

    const [showAddComment, setShowAddComment] = useState(false);

    const repostPost = async (originalPostId: string) => {
        const res = await fetch("/api/posts/repost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                originalPostId,
             }),
        })

        const data = await res.json();
        toast.success("Post reposted successfully")

        if (!res.ok) { throw new Error(data.error || 'Failed to repost');}

        console.log(data)

    }


     
  return (
    <>
       <div className="flex items-center px-3 py-1">
      <button
        onClick={() => {
          handleLike();
          setIsCurrentUserLikedpost((preve) => !preve);
        }}
        className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-800 ${
          isCurrentUserLikedPost
            ? "text-amber-500"
            : "text-gray-500 hover:text-amber-500"
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
        <p>Comment</p>
      </button>

      <button 
        className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-800 hover:text-amber-500 transition-all duration-200"
        onClick={() => repostPost(postId)}  
      >
        <BiRepost className="text-lg" />
        <span>Repost</span>
      </button>
    </div>

     {/* Add Comment */}
      {showAddComment && (
        <div className="border-t border-gray-800 px-5 py-4">
          <AddComment postId={postId}  />
        </div>
      )}
    </>
  );
};

export default PostActions;
