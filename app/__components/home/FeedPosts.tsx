"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/Post";
import UserAddPostFromFeed from "../user/UserAddPostFromFeed";
import { Post } from "@/app/generated/prisma/client";



const FeedPosts = ({ feedPosts }: { feedPosts: Post[] }) => {
  const [posts, setPosts] = useState<Post[]>(feedPosts);
 


  return (
    <div className="flex-1">
      <UserAddPostFromFeed />

      {/* Posts */}
      {posts.map((post: any) => (
        <PostCard
          key={post.id}
          post={post}
          isRepost={!!post.repostingPostId}
          originalPost={post.originalPost}
        />
      ))}
    </div>
  );
};

export default FeedPosts;
