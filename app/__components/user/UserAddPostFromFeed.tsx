"use client"

import { useUserStore } from "@/store/userStore"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import CreatePost from "../post/CreatePost"
import { usePostsStore } from "@/store/postStore"
import AvatarLik from "../nav/NavLink"


const UserAddPostFromFeed = () => {

    const user = useUserStore((state) => state.user)
    const {fetchUserPosts}  = usePostsStore()
    const [show, setShow] = useState(false)

  return (
    <div className="px-3 py-4 mb-5 bg-gray-900 border border-gray-800 rounded-xl flex gap-3" >

          {show && <CreatePost mode="create"  onClose={() => setShow(false)} show onPostCreated={() => fetchUserPosts(user?.id || "")}/>}
            
            <AvatarLik href={`/profile/${user?.id}`} image={user?.image || ""} />

            <div className="flex-1 rounded-full border border-(--icon-bg-color) overflow-hidden" >
                  <input 
                     type="text" 
                     placeholder="Start a new post"
                     className="w-full h-full pl-3"
                     onFocus={() => setShow(true)}
                  />
            </div>
    </div>
  )
}

export default UserAddPostFromFeed