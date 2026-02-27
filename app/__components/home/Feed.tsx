import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import PostCard from "../post/Post";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


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
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-2 flex-1" >
            {posts.map((post: any) => (
                <PostCard key={post.id} post={post}  />
            ))}
    </div>
  )
}

export default Feed