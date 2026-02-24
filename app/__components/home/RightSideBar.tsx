import React from 'react'

const friends = [
  { id: 1, name: "John Smith", img: "https://randomuser.me/api/portraits/men/32.jpg", online: true },
  { id: 2, name: "Jane Doe", img: "https://randomuser.me/api/portraits/women/44.jpg", online: true },
  { id: 3, name: "Michael Lee", img: "https://randomuser.me/api/portraits/men/56.jpg", online: false },
  { id: 4, name: "Emily Clark", img: "https://randomuser.me/api/portraits/women/68.jpg", online: true },
  { id: 5, name: "David Brown", img: "https://randomuser.me/api/portraits/men/72.jpg", online: false },
]

const RightSideBar = () => {
  return (
    <div className="w-1/4 h-screen sticky top-0 bg-gray-900 border-l border-gray-800 flex flex-col">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-800">
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-0.5">
          Online
        </p>
        <h2 className="text-lg font-semibold text-gray-100 tracking-tight">
          Friends
        </h2>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-3 py-2 text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-1">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-800 cursor-pointer group transition-colors duration-200"
          >
            {/* Avatar + online dot */}
            <div className="relative shrink-0">
              <img
                src={friend.img}
                alt={friend.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-800 group-hover:border-amber-500/40 transition-colors duration-200"
              />
              {friend.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-gray-900" />
              )}
            </div>

            {/* Name + status */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-200 truncate group-hover:text-gray-100 transition-colors">
                {friend.name}
              </p>
              <p className={`text-xs ${friend.online ? "text-amber-500" : "text-gray-600"}`}>
                {friend.online ? "Online" : "Offline"}
              </p>
            </div>

            {/* Message icon */}
            <span className="text-gray-700 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          </div>
        ))}
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