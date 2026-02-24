"use client";

import { useUserStore } from "@/store/userStore";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdBookmark } from "react-icons/md";
import { useState } from "react";

const PostDropdownMenu = ({
  id,
  show,
  onClose,
  onPostDeleted,
  onEdit,
}: {
  id: string;
  show: boolean;
  onClose: () => void;
  onPostDeleted: () => void;
  onEdit: () => void;
}) => {
  const user = useUserStore((state) => state.user);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!show) return null;

  return (
    <>
      {/* Click outside to close */}
      <div className="fixed inset-0 z-10" onClick={onClose} />

      <div className="absolute top-10 right-3 z-20 w-44 bg-gray-900 border border-gray-700 rounded-md shadow-xl overflow-hidden">

        {user?.id === id ? (
          <>
            {/* Edit */}
            <button
              onClick={() => { onEdit(); onClose(); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-all duration-150"
            >
              <RiEditFill className="text-base shrink-0" />
              <span>Edit Post</span>
            </button>

            {/* Divider */}
            <div className="h-px bg-gray-800 mx-3" />

            {/* Delete */}
            <button
              onClick={() => { setDeleteLoading(true); onPostDeleted(); }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
            >
              <MdDelete className="text-base shrink-0" />
              <span>{deleteLoading ? "Deleting..." : "Delete Post"}</span>
            </button>
          </>
        ) : (
          <>
            {/* Save */}
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-all duration-150">
              <MdBookmark className="text-base shrink-0" />
              <span>Save Post</span>
            </button>

            {/* Divider */}
            <div className="h-px bg-gray-800 mx-3" />

            {/* Follow */}
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-500 transition-all duration-150">
              <IoAddCircleSharp className="text-base shrink-0" />
              <span>Follow User</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PostDropdownMenu;