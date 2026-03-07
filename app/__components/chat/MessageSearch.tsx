"use client"
import { useState } from "react";

const MessageSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 focus-within:border-gray-600 transition-colors">
        <svg
          className="w-4 h-4 text-gray-500 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full"
        />
      </div>
    </div>
  );
};

export default MessageSearch;
