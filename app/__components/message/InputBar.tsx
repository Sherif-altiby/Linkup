"useu client"

import { useState } from "react";

const InputBar = () => {

    const [input, setInput] = useState("");
  return (
    <div className="shrink-0 px-6 pb-6 pt-3 rounded-md bg-gray-950">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border border-gray-800 rounded-[14px] focus-within:border-violet-600 transition-colors">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setInput("")}
          placeholder="Write a message..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
        />

        <button
          onClick={() => setInput("")}
          className="w-9 h-9 flex items-center justify-center shrink-0 bg-violet-700 rounded-[10px] hover:opacity-85 hover:scale-105 active:scale-95 transition-all"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputBar;
