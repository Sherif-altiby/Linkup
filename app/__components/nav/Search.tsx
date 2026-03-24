"use client";

import { useState,  useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { User } from "@/app/generated/prisma/client";
import FriendCard from "../friends/FriendCard";

const Search = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const searchResults = async () => {
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      console.log("data from search: ", data)
      if (!res.ok) throw new Error(data.error);
      setResults(data.users);
    } catch (err: any) {
      if (err.name !== "AbortError") setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchResults()
  }, [query])

  return (
    <div className="relative hidden sm:block">
      {/* Input */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <CiSearch className="text-lg" />
      </span>
      <input
        type="text"
        placeholder="Search LinkUp..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2 w-52 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
        onFocus={() => setShow(true)}
      />

      {/* Overlay */}
      <div
        className={`fixed left-0 right-0 bg-gray-800/45 backdrop-blur-xl z-40 transition-all p-5 duration-300 ${
          show
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ top: "64px", height: "calc(100vh - 64px)" }}
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0 -z-10" onClick={() => setShow(false)} />

        <div className="max-w-xl w-full mx-auto px-5 py-8 h-full flex flex-col bg-gray-900  rounded-xl gap-5">
         
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
              <p className="text-gray-600 text-sm">
                Search for people by name or email
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center pt-16 gap-3">
              <CiSearch className="text-5xl text-gray-800" />
              <p className="text-gray-600 font-semibold text-sm">
                No users found
              </p>
              <span className="text-gray-700 text-xs">
                Try a different name or email
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1 overflow-y-auto flex-1">
              {results?.map((user) => (
                <FriendCard friend={user}  key={user.id}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;