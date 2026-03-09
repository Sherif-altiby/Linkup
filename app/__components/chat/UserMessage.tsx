"use client";

import { useEffect, useState } from "react";
import AvatarLik from "../nav/NavLink";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";
import { getSocket } from "@/lib/socket";

type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  sender: { id: string; name: string | null; image: string | null };
};

type Props = { receiverId: string };

const UserMessage = ({ receiverId }: Props) => {
  const user = useUserStore((state) => state.user);
  const { messages, addMessage, setMessages } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const roomId = user?.id ? [user.id, receiverId].sort().join("-") : null;

  // Load history
  useEffect(() => {
    if (!user?.id || !receiverId) return;

    setLoading(true);
    fetch(`/api/chat?senderId=${user.id}&receiverId=${receiverId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, [user?.id, receiverId]);

  // Socket listeners
  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();
    socket.connect();
    socket.emit("join-room", roomId);

    // Add incoming message to store — sender will see it too via store
    socket.on("receive-message", (message: Message) => {
      addMessage(message);
    });

    socket.on("user-typing", () => setIsTyping(true));
    socket.on("user-stop-typing", () => setIsTyping(false));

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex gap-2 ${i % 2 === 0 ? "flex-row-reverse" : ""} animate-pulse`}>
            <div className="w-8 h-8 rounded-full bg-gray-800 shrink-0" />
            <div className="h-12 bg-gray-800 rounded-xl w-48" />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0 && !isTyping) {
    return (
      <p className="text-xs text-gray-600 text-center py-6">
        No messages yet. Say hi! 👋
      </p>
    );
  }

  return (
    <>
      {messages.map((msg) => {
        const isMe = msg.senderId === user?.id;
        return (
          <div key={msg.id} className={`flex ${isMe ? "flex-row-reverse" : "flex-row"} gap-2  `}>
            <AvatarLik href="" image={msg.sender.image ?? "/default-avatar.png"} />
            <div className="max-w-[65%]">
              <div className={`px-4 py-2.5 text-sm leading-relaxed rounded-md ${
                isMe ? "bg-violet-700 text-white" : "bg-gray-900 border border-gray-800 text-gray-200"
              }`}>
                {msg.content}
              </div>
              <p className={`text-[10px] text-gray-600 mt-1 ${isMe ? "text-right" : "text-left"}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 shrink-0" />
          <div className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-md flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessage;