import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import PostCard from "../post/Post";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserAddPostFromFeed from "../user/UserAddPostFromFeed";


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

  return (
    <div className=" flex-1" >
            <UserAddPostFromFeed />
            {posts.map((post: any) => (
                <PostCard key={post.id} post={post}  />
            ))}
    </div>
  )
}

export default Feed