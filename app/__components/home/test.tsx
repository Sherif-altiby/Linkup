"use client";

import { Post, User } from "@/app/generated/prisma/client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/Post";
import UserAddPostFromFeed from "../user/UserAddPostFromFeed";
import PostSkeleton from "@/skeletons/PostSkeleton";

// Define the shape of our API response
type PostWithAuthor = Post & {
  author: Pick<User, "id" | "name" | "image">;
  _count: { likes: number; comments: number };
};

export default function InfiniteFeed() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // This hook detects when the bottom of the list is visible
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const fetchPosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      // If cursor exists, append it to URL. If null, it fetches the first batch.
      const url = cursor ? `/api/posts?cursor=${cursor}` : `/api/posts`;
      const res = await fetch(url);
      const data = await res.json();

      setPosts((prev) => [...prev, ...data.posts]); // Append new posts

      if (data.nextCursor) {
        setCursor(data.nextCursor);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when user scrolls to the bottom
  useEffect(() => {
    if (inView && hasMore) {
      fetchPosts();
    }
  }, [inView, hasMore]);

  return (
    <div className="flex-1">
      <UserAddPostFromFeed />
      <div className="space-y-4">
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            isRepost={!!post.repostingPostId}
            originalPost={post.originalPost}
          />
        ))}
      </div>

      {/* Sentinel / Loading Indicator */}
      <div ref={ref} className="py-10 flex justify-center">
        {isLoading && <PostSkeleton />}
        {!hasMore && (
          <p className="text-gray-600 text-sm italic">
            You've reached the end of the universe.
          </p>
        )}
      </div>
    </div>
  );
}
