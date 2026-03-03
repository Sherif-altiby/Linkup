import { User } from "@/app/generated/prisma/client"
import AvatarLik from "../nav/NavLink"

const FriendCard = ({friend}: {friend: User}) => {
  return (
    <div
            key={friend.id}
            className="flex items-center gap-3 p-2.5 porder rounded-xl hover:bg-gray-800 cursor-pointer group transition-colors duration-200"
          >
            {/* Avatar + online dot */}
            <AvatarLik href={`/users/${friend.id}`} image={friend.image || "user image"}/>

            {/* Name + status */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-200 truncate group-hover:text-gray-100 transition-colors">
                {friend.name}
              </p>
              
            </div>

            {/* Message icon */}
            <span className="text-gray-700 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          </div>
  )
}

export default FriendCard