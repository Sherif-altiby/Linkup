import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const posts = await prisma.post.findMany({
      where: { authorId: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        ...(currentUserId && {
          likes: {
            where: { userId: currentUserId },
            select: { userId: true },
          },
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    const postsWithLikedBy = posts.map((post) => ({
      ...post,
      isLikedByCurrentUser: currentUserId
        ? (post.likes ?? []).length > 0
        : false,
      likes: undefined, // remove likes array from response
    }));

    return NextResponse.json(postsWithLikedBy);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}