"use client";

import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { User } from "@/app/generated/prisma/client";


const Search = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch from API
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Abort previous request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/users/search?q=${encodeURIComponent(query)}`,
          { signal: abortRef.current!.signal }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setResults(data.users);
      } catch (err: any) {
        if (err.name !== "AbortError") setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timeout);
      abortRef.current?.abort();
    };
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleClose = () => {
    setShow(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative hidden sm:block">
      {/* Input */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <CiSearch className="text-lg" />
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search LinkUp..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2 w-52 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
        onFocus={() => setShow(true)}
      />

      {/* Overlay */}
      <div
        className={`fixed left-0 right-0 bg-gray-950/95 backdrop-blur-xl z-40 transition-all duration-300 ${
          show
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ top: "64px", height: "calc(100vh - 64px)" }}
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0 -z-10" onClick={handleClose} />

        <div className="max-w-xl w-full mx-auto px-5 py-8 h-full flex flex-col gap-5">

          {/* Keyboard hints */}
          <div className="flex gap-4">
            {[["↑↓", "navigate"], ["↵", "select"], ["Esc", "close"]].map(([key, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-700">
                <kbd className="bg-white/5 border border-white/8 rounded px-1.5 py-0.5 font-mono text-[11px] text-gray-600">
                  {key}
                </kbd>
                {label}
              </div>
            ))}
          </div>

          {/* Label */}
          <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-600">
            {!query
              ? "Type to search users"
              : loading
              ? "Searching..."
              : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
          </span>

          {/* States */}
          {loading ? (
            <div className="flex justify-center pt-16">
              <div className="w-5 h-5 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
            </div>

          ) : !query ? (
            <div className="flex flex-col items-center pt-16 gap-3">
              <CiSearch className="text-5xl text-gray-800" />
              <p className="text-gray-600 text-sm">Search for people by name or email</p>
            </div>

          ) : results.length === 0 ? (
            <div className="flex flex-col items-center pt-16 gap-3">
              <CiSearch className="text-5xl text-gray-800" />
              <p className="text-gray-600 font-semibold text-sm">No users found</p>
              <span className="text-gray-700 text-xs">Try a different name or email</span>
            </div>

          ) : (
            <div className="flex flex-col gap-1 overflow-y-auto flex-1">
              {results.map((user, i) => (
                <div
                  key={user.id}
                  onClick={handleClose}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl border border-transparent hover:bg-white/4 hover:border-white/6 cursor-pointer transition-all duration-150 group"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? "user"}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-amber-500 font-bold text-sm">
                        {user.name?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-200 truncate">{user.name}</p>
                    <p className="text-xs text-gray-600 truncate mt-0.5">
                      {user.bio ? `${user.bio} · ` : ""}{user.email}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-gray-700 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;