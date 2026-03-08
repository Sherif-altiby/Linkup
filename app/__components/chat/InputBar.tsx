"use client";

import { useState, useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";
import { useParams } from "next/navigation";

const InputBar = () => {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const user = useUserStore((state) => state.user);
  const addMessage = useChatStore((state) => state.addMessage);
  const params = useParams();
  const receiverId = params.id as string;
  const roomId = user?.id ? [user.id, receiverId].sort().join("-") : null;

  useEffect(() => {
    if (!roomId) return;
    const socket = getSocket();
    socket.connect();
    socket.emit("join-room", roomId);
  }, [roomId]);

  const sendMessage = async () => {
    if (!input.trim() || isSending || !user?.id || !roomId) return;

    const content = input.trim();
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, senderId: user.id, receiverId }),
      });

      if (!res.ok) throw new Error("Failed to send");
      const savedMessage = await res.json();

      addMessage(savedMessage);

      const socket = getSocket();
      socket.emit("send-message", { ...savedMessage, roomId });

    } catch (err) {
      console.error(err);
      setInput(content);
    } finally {
      setIsSending(false);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!roomId) return;

    const socket = getSocket();
    socket.emit("typing", { roomId, userName: user?.id });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", { roomId });
    }, 1000);
  };

  return (
    <div className="shrink-0 px-6 pb-6 pt-3 rounded-md bg-gray-950">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border border-gray-800 rounded-[14px] focus-within:border-violet-600 transition-colors">
        <input
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write a message..."
          disabled={isSending}
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isSending || !input.trim()}
          className="w-9 h-9 flex items-center justify-center shrink-0 bg-violet-700 rounded-[10px] hover:opacity-85 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputBar;
