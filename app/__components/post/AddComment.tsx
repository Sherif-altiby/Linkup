"use client";

import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useState, useTransition  } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

const AddComment = ({ postId }: { postId: string }) => {

    const user = useUserStore((state) => state.user);
    const [commentText, setCommentText] = useState("");
    const [isPending, startTransition] = useTransition();


    const handleAddComment = async () => {
            if (!commentText.trim()) return;

            try {
                startTransition(async () => {
                    const res = await fetch(`/api/comments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            postId,
                            content: commentText,
                        }),
                    });

                    if (!res.ok) {
                        toast.error("Failed to add comment");
                    }

                    setCommentText("");
                    toast.success("Comment added successfully!");
                });
            } catch (error) {
                toast.error("An error occurred while adding the comment");
            }
    }

  return <div className="flex items-center gap-3 p-2" >
         <Image 
                src={user?.image || "/default-avatar.png"}
                alt={user?.name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full"
         />

         <div className="relative flex-1 border border-(--text-secondary-color) h-10 rounded-full pl-3 pr-10 " >
              <input 
                type="text" 
                className="block w-full h-full" 
                placeholder="Add a comment" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              {!isPending ? (
                <button 
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-(--text-secondary-color) hover:text-blue-600 cursor-pointer" 
                 disabled={!commentText.trim()}
                 onClick={handleAddComment}
              >
                  <IoSend size={20}/>
              </button>
              ) : (<button 
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-(--text-secondary-color) " 
                 disabled
              >
                  <AiOutlineLoading3Quarters size={20} className="animate-spin duration-100"/>
              </button>)}
         </div>
  </div>;
};

export default AddComment;
