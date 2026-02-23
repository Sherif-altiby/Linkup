import LeftSideBar from "./__components/home/LeftSideBar";
import RightSideBar from "./__components/home/RightSideBar";
import PostCard from "./__components/post/Post";
import prisma from "@/lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {

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
     <div>
        <main>
                
                <div className="flex gap-4 mt-5" >
                    <LeftSideBar />
                      <div className="p-2 flex-1" >
                        {posts.map((post: any) => (
                          <PostCard key={post.id} post={post}  />
                        ))}
                      </div>
                    <RightSideBar />
                </div>
        </main>
     </div>
  );
}
