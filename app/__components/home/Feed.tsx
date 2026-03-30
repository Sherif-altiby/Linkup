import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeedPosts from "./FeedPosts";

const Feed = async () => {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  const posts = await prisma.post.findMany({
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

  return <FeedPosts feedPosts={posts}  />;
};

export default Feed;