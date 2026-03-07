"use client";

import InputBar from "@/app/__components/message/InputBar";
import MessageSearch from "@/app/__components/message/MessageSearch";
import UserMessage from "@/app/__components/message/UserMessage";
import { useState } from "react";

const conversations = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Just shipped a brand-new feature 🚀",
    time: "2m ago",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "Bob Martinez",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Hot take: writing tests first actually saves time",
    time: "14m ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Carol Kim",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Redesigned our onboarding flow 🎯",
    time: "1h ago",
    unread: 1,
    online: false,
  },
  {
    id: "4",
    name: "Dan Cooper",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Cold start times went from 800ms → 12ms ⚡",
    time: "3h ago",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Eva Rossi",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Q3 planning done! Roadmap is locked 🛠️",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
];


export default function MessagesPage() {
  const [activeId, setActiveId] = useState("1");
  const [search, setSearch] = useState("");

  const active = conversations.find((c) => c.id === activeId);
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-72 shrink-0 flex flex-col bg-gray-900 border-r border-gray-800 h-full">

        {/* Search */}
        <MessageSearch />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-0.5 cursor-pointer transition-colors border-l-2 ${
                activeId === c.id
                  ? "bg-white/[0.04] border-violet-600"
                  : "border-transparent hover:bg-white/[0.03]"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-2xl object-cover" />
                {c.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold truncate ${activeId === c.id ? "text-white" : "text-gray-300"}`}>
                    {c.name}
                  </span>
                  <span className="text-[10px] text-gray-600 shrink-0 ml-1">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{c.lastMessage}</p>
              </div>

              {/* Unread badge */}
              {c.unread > 0 && (
                <span className="shrink-0 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* ── CHAT AREA ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Chat Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={active?.avatar} alt={active?.name} className="w-10 h-10 rounded-2xl object-cover" />
              {active?.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
              )}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{active?.name}</p>
              <p className={`text-xs ${active?.online ? "text-green-500" : "text-gray-500"}`}>
                {active?.online ? "Online now" : "Offline"}
              </p>
            </div>
          </div>       
        </div>

        {/* Messages */}
        <div className="flex-1  overflow-y-auto px-6 py-6 flex flex-col gap-3 bg-gray-90">
           <UserMessage />
        </div>

        {/* Input Bar */}
        <InputBar />
      </main>
    </div>
  );
}