import LeftSideBar from "./__components/LeftSideBar";
import RightSideBar from "./__components/RightSideBar";
import PostCard from "./__components/Post";
import prisma from "@/lib/prisma";

export default async function Home() {

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
        },
      },
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
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    <RightSideBar />
                </div>
        </main>
     </div>
  );
}
