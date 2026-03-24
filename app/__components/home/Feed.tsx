import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeedPosts from "./FeedPosts";

const Feed = async () => {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  console.log("=== INITIAL FEED LOAD ===");
  console.log("Current user ID:", currentUserId);

  const limit = 10;

  // First, let's check total posts
  const totalPosts = await prisma.post.count({
    where: {
      authorId: {
        not: currentUserId,
      },
    },
  });

  console.log("Total posts excluding current user:", totalPosts);

  const posts = await prisma.post.findMany({
    take: limit + 1,
    where: {
      authorId: {
        not: currentUserId,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("Initial posts fetched:", posts.length);

  let nextCursor: string | undefined = undefined;
  if (posts.length > limit) {
    const nextItem = posts.pop();
    nextCursor = nextItem!.id;
    console.log("Initial next cursor:", nextCursor);
  } else {
    console.log("No next cursor - loaded all available posts");
  }

  console.log("Passing to client:", posts.length, "posts with cursor:", nextCursor);

  return <FeedPosts initialPosts={posts} initialCursor={nextCursor} />;
};

export default Feed;