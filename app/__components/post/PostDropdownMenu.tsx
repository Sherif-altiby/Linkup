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

  return (
    <div
      className={`absolute top-3 right-3 bg-white shadow-md rounded-md z-10 w-34 text-text-secondary-color ${show ? "block" : "hidden"}`}
    >
      <div className="flex justify-end px-2 pt-2 mb-2">
        <IoMdCloseCircle
          size={20}
          onClick={onClose}
          className="cursor-pointer text-gray-400 hover:text-red-500 transition"
        />
      </div>

      {user?.id === id ? (
        <div>
          <div className="flex items-center justify-between gap-2 hover:bg-gray-100 px-2 py-3 rounded-lg transition cursor-pointer"
                      onClick={() => { onEdit(); onClose(); }} >
            <RiEditFill size={20} />
            <p>Edit</p>
          </div>
          <div
            className="flex items-center justify-between gap-2 hover:bg-gray-100 px-2 py-3 rounded-lg transition cursor-pointer"
            onClick={() => {
              setDeleteLoading(true);
              onPostDeleted();
            }}
          >
            <MdDelete size={20} />
            <p> {deleteLoading ? "Deleting..." : "Delete"} </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-2 hover:bg-gray-100 px-2 py-3 rounded-lg transition cursor-pointer">
            <p>Save</p>
            <MdBookmark size={20} />
          </div>
          <div className="flex items-center justify-between gap-2 hover:bg-gray-100 px-2 py-3 rounded-lg transition cursor-pointer">
            <p>Follow</p>
            <IoAddCircleSharp size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDropdownMenu;
