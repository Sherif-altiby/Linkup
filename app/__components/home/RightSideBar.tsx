"use client"

import { useEffect, useState } from 'react'
import FriendCard from '../friends/FriendCard'
import { User } from '@/app/generated/prisma/client'

const RightSideBar = () => {

  const [friends, setFriends] = useState<User[]>([])

  const fetchFrieds = async () => {
    const res = await fetch(`/api/users/all?page=1&limit=5`);
    const data = await res.json();

    setFriends(data.users);
  }

  useEffect(() => {
    fetchFrieds();
  }, []);

  return (
    <div className="hidden w-1/4 h-[calc(100vh-100px)] sticky rounded-xl top-16.25 bg-gray-900 border-l border-gray-800 lg:flex flex-col">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-800">
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-0.5">
          Online
        </p>
        <h2 className="text-lg font-semibold text-gray-100 tracking-tight">
          Friends
        </h2>
      </div>

     

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-1">
        {friends.map((friend) => (<FriendCard friend={friend} key={friend.id} />))}
      </div>

      {/* Footer */}
      <div className="px-4 pb-5 pt-3 border-t border-gray-800">
        <button className="w-full py-2 rounded-xl border border-gray-700 text-xs font-medium tracking-widest uppercase text-gray-500 hover:border-amber-500/40 hover:text-amber-500 transition-all duration-200">
          See All Friends
        </button>
      </div>

    </div>
  )
}

export default RightSideBar