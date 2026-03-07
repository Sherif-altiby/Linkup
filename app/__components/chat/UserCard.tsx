// app/__components/chat/UserCard.tsx
import Image from "next/image";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

async function getConversations() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const currentUserId = session.user.id;

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUserId },
        { receiverId: currentUserId },
      ],
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
      receiver: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Extract unique users from messages
  const usersMap = new Map();
  messages.forEach((msg) => {
    const otherUser =
      msg.senderId === currentUserId ? msg.receiver : msg.sender;

    if (!usersMap.has(otherUser.id)) {
      usersMap.set(otherUser.id, {
        ...otherUser,
        lastMessage: msg.content,
        lastMessageTime: msg.createdAt,
      });
    }
  });

  return Array.from(usersMap.values());
}

export default async function UserCard() {
  const conversations = await getConversations();

  if (conversations.length === 0) {
    return (
      <p className="text-xs text-gray-600 text-center py-6">
        No conversations yet
      </p>
    );
  }

  return (
    <>
      {conversations.map((user) => (
        <Link
        href={`/chat/${user.id}`}
          key={user.id}
          className="flex items-center gap-3 px-3 py-3 rounded-xl mb-0.5 cursor-pointer transition-colors border-l-2 border-transparent hover:bg-white/[0.03]"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <Image
              src={user.image ?? "/default-avatar.png"}
              alt={user.name ?? "User"}
              className="w-10 h-10 rounded-2xl object-cover"
              width={40}
              height={40}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold truncate text-gray-300">
                {user.name ?? "Unknown"}
              </span>
              <span className="text-[10px] text-gray-600 shrink-0 ml-1">
                {new Date(user.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user.lastMessage}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}