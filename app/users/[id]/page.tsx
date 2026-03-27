"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { User } from "@/app/generated/prisma/client";
import Image from "next/image";
import { usePostsStore } from "@/store/postStore";
import { PostWithAuthor } from "@/app/__types";
import PostCard from "@/app/__components/post/Post";
import PostSkeleton from "@/skeletons/PostSkeleton";

const IconMessage = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconUserPlus = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
);

const IconUserCheck = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8l2 2 4-4"
    />
  </svg>
);

export default function UserViewPage() {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<User>();

  const { fetchUserPosts, posts, loading } = usePostsStore();
  const [isPending, startTransition] = useTransition();

  const { id } = useParams<{ id: string }>();

  const getUserInfo = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    console.log("USER: ", data)

    setUser(data);
    setFollowed(data.isFollowing)
  };

  const details = [
    {
      label: "Email",
      value: user?.email,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: user?.location,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: user?.phone,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.27 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "Birth Date",
      value: user?.birthDate,
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  const followUser = async (userId : string) => {
  const res = await fetch('/api/follow', {
    method: 'POST',
    body: JSON.stringify({ targetUserId: userId }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  setFollowed(data.isFollowing)
};


  useEffect(() => {
    getUserInfo(id);
    fetchUserPosts(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-850 text-gray-100">
      <div className="mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10 container">
          {/* ── LEFT: Profile Card ── */}
          <div className="md:w-1/2">
            <div className="sticky top-8 flex flex-col gap-4">
              {/* Main info card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                {/* Card top accent */}
                <div className="h-20 bg-linear-to-br from-gray-800 to-gray-900 relative">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 60%, var(--secondary-color, #7c3aed) 0%, transparent 65%)",
                    }}
                  />
                </div>

                <div className="px-5 pb-5">
                  {/* Avatar */}
                  <div className="-mt-10 mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-800 border-4 border-gray-900 overflow-hidden shadow-xl flex items-center justify-center">
                      {user?.image ? (
                        <Image
                          src={user?.image}
                          alt={user.name || "user Imahe"}
                          className="w-full h-full object-cover"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <span className="text-secondary-color font-black text-3xl">
                          {user?.name?.[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name + handle */}
                  <h2 className="text-white font-bold text-xl leading-tight">
                    {user?.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">@{user?.name}</p>

                  {/* Bio */}
                  {user?.bio && (
                    <p className="text-gray-400 text-sm leading-relaxed mt-3">
                      {user.bio}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2.5 mt-4">
                    <button
                      onClick={() => followUser(user?.id || "")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        followed
                          ? "bg-gray-800 border border-gray-700 text-gray-300 hover:border-red-500/50 hover:text-red-400"
                          : "bg-secondary-color text-white hover:opacity-90"
                      }`}
                    >
                      {followed ? <IconUserCheck /> : <IconUserPlus />}
                      {followed ? "Following" : "Follow"}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-all">
                      <IconMessage />
                      Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Details card */}
              <div className="px-6 py-5 space-y-3">
                {details.map((item) =>
                  item.value ? (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-800 hover:border-amber-500/30 transition-colors duration-200"
                    >
                      <span className="text-amber-500 shrink-0">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium tracking-widest uppercase text-gray-500 leading-none mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-200 truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Posts ── */}
          <div className="md:w-1/2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">Posts</h3>
              <span className="text-gray-600 text-sm">
                {posts.length} posts
              </span>
            </div>

            {loading ? (
              <PostSkeleton />
            ) : (
              posts.map((post: PostWithAuthor) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
