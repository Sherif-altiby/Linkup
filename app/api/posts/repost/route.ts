import { getCurrentUser } from "@/lib/auth/currentUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { originalPostId, content } = await req.json();

    if (!originalPostId) {
      return Response.json(
        { error: "Original post ID is required" },
        { status: 400 }
      );
    }

    const originalPost = await prisma.post.findUnique({
      where: { id: originalPostId },
    });

    if (!originalPost) {
      return Response.json(
        { error: "Original post not found" },
        { status: 404 }
      );
    }

    const repost = await prisma.post.create({
      data: {
        content: content || "",
        authorId: user.id,
        repostingPostId: originalPost.id,
      },
      include: {
        originalPost: true,
      },
    });

    return Response.json(repost, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}