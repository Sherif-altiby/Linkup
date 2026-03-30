import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth/currentUser'
import { uploadImage } from '@/lib/uploadImage'
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, image } = await req.json()

    if (!content) {
      return Response.json({ error: 'Content is required' }, { status: 400 })
    }

    // upload image to cloudinary if exists
    let imageUrl = null
    if (image) {
      imageUrl = await uploadImage(image, 'posts')
    }

    const post = await prisma.post.create({
      data: {
        content,
        image: imageUrl,
        authorId: user.id,
      },
    })

    return Response.json(post, { status: 201 })

  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");  
    const limit = 10;

    const posts = await prisma.post.findMany({
      // 1. Fetch one extra to see if there is a "Next Page"
      take: limit + 1,
      
      // 2. ONLY skip and use cursor if a cursor actually exists
      ...(cursor ? {
        skip: 1, 
        cursor: { id: cursor },
      } : {}),

      where: {
        authorId: { not: currentUserId },
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        likes: { select: { userId: true } },
        _count: { select: { likes: true, comments: true } },
      },
      // IMPORTANT: Cursor pagination requires a stable, unique sort
      orderBy: [
        { createdAt: "desc" },
        { id: "asc" } // Secondary sort to prevent logic breaks if 2 posts have same timestamp
      ],
    });

    let nextCursor: string | undefined = undefined;

    // 3. If we got 11 items, it means there is more data to fetch
    if (posts.length > limit) {
      const nextItem = posts.pop(); // Remove the 11th item
      nextCursor = nextItem!.id;    // Use its ID as the bookmark for next time
    }

    return NextResponse.json({
      posts,
      nextCursor,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}