"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Message } from "@/app/generated/prisma/client";

type MessageWithSender = Message & {
  sender: { id: string; name: string | null; image: string | null };
};

export function useChat(currentUserId: string, receiverId: string) {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Room ID — same for both users (sorted so it's consistent)
  const roomId = [currentUserId, receiverId].sort().join("-");

  useEffect(() => {
    const socket = getSocket();
    socket.connect();
    socket.emit("join-room", roomId);

    // Receive new message
    socket.on("receive-message", (message: MessageWithSender) => {
      setMessages((prev) => [...prev, message]);
    });

    // Typing indicators
    socket.on("user-typing", () => setIsTyping(true));
    socket.on("user-stop-typing", () => setIsTyping(false));

    // Load message history
    fetch(`/api/messages?senderId=${currentUserId}&receiverId=${receiverId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
      socket.off("user-stop-typing");
      socket.disconnect();
    };
  }, [roomId, currentUserId, receiverId]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Save to DB
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, senderId: currentUserId, receiverId }),
    });

    const message: MessageWithSender = await res.json();

    // Add to own messages immediately
    setMessages((prev) => [...prev, message]);

    // Emit to receiver via socket
    const socket = getSocket();
    socket.emit("send-message", { ...message, roomId });
  };

  const handleTyping = () => {
    const socket = getSocket();
    socket.emit("typing", { roomId, userName: "User" });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { roomId });
    }, 1500);
  };

  return { messages, isTyping, loading, sendMessage, handleTyping };
}