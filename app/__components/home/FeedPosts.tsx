"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/Post";
import UserAddPostFromFeed from "../user/UserAddPostFromFeed";

interface Post {
  id: string;
  // Add other post properties as needed
}

interface FeedProps {
  initialPosts: Post[];
  initialCursor: string | undefined;
}

const FeedPosts = ({ initialPosts, initialCursor }: FeedProps) => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  // Direct initialization - no useEffect needed
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [cursor, setCursor] = useState<string | undefined>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(initialCursor !== undefined && initialCursor !== null);
  const [error, setError] = useState<string | null>(null);
  
  const loadingRef = useRef(false);

  console.log("🔄 RENDER #", renderCount.current);
  console.log("Initial Props - posts:", initialPosts.length, "cursor:", initialCursor);
  console.log("Current State - posts:", posts.length, "cursor:", cursor, "hasMore:", hasMore);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const loadMore = async () => {
    if (loadingRef.current || !hasMore || !cursor) {
      console.log("❌ Skipping loadMore:", { 
        loadingRef: loadingRef.current, 
        hasMore, 
        cursor 
      });
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);
    
    console.log("✅ Loading more posts with cursor:", cursor);
    
    try {
      const response = await fetch(`/api/posts?cursor=${cursor}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("📦 Loaded posts:", data.posts.length, "Next cursor:", data.nextCursor);

      if (data.posts.length === 0) {
        console.log("⚠️ No posts returned, setting hasMore to false");
        setHasMore(false);
        return;
      }

      setPosts((prev) => {
        const newPosts = [...prev, ...data.posts];
        console.log("📊 Total posts now:", newPosts.length);
        return newPosts;
      });
      setCursor(data.nextCursor);
      setHasMore(data.nextCursor !== undefined && data.nextCursor !== null);
      
      console.log("🎯 Updated - cursor:", data.nextCursor, "hasMore:", data.nextCursor !== undefined);
    } catch (error) {
      console.error("💥 Error loading posts:", error);
      setError(error instanceof Error ? error.message : "Failed to load posts");
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    console.log("👁️ InView:", inView, "| hasMore:", hasMore, "| loading:", loadingRef.current, "| cursor:", cursor);
    if (inView && hasMore && !loadingRef.current && cursor) {
      console.log("🚀 Triggering loadMore...");
      loadMore();
    }
  }, [inView, hasMore, cursor]);

  return (
    <div className="flex-1">
      <UserAddPostFromFeed />
      
      {/* Debug info - remove this in production */}
      <div className="text-xs text-gray-500 p-2 bg-gray-100 border-b sticky top-0 z-10">
        <div>Posts: {posts.length} | hasMore: {String(hasMore)} | cursor: {cursor || 'none'} | loading: {String(loading)}</div>
        <div>Renders: {renderCount.current}</div>
      </div>
      
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {/* Intersection observer trigger */}
      {hasMore && (
        <div 
          ref={ref} 
          className="h-20 flex items-center justify-center"
          style={{ minHeight: "80px" }}
        >
          <span className="text-gray-400 text-sm">Loading trigger point...</span>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          <span className="ml-3 text-gray-600 font-medium">Loading more posts...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 p-4 bg-red-50 border border-red-200 rounded m-4">
          <p className="font-semibold">Error: {error}</p>
          <button
            onClick={() => {
              setError(null);
              loadingRef.current = false;
              if (cursor) {
                setHasMore(true);
                loadMore();
              }
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}
      
      

      {!loading && !error && posts.length === 0 && (
        <div className="text-center p-12">
          <p className="text-gray-500 text-lg">No posts yet</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to create one!</p>
        </div>
      )}
    </div>
  );
};

export default FeedPosts;