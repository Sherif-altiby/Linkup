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

    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limit = 10;

    console.log("\n=== API POSTS REQUEST ===");
    console.log("Current user ID:", currentUserId);
    console.log("Cursor received:", cursor);

    // Check total remaining posts
    const totalRemaining = await prisma.post.count({
      where: {
        authorId: {
          not: currentUserId,
        },
        ...(cursor && cursor !== "" && {
          createdAt: {
            lt: await prisma.post.findUnique({
              where: { id: cursor },
              select: { createdAt: true }
            }).then(post => post?.createdAt)
          }
        }),
      },
    });

    console.log("Total remaining posts:", totalRemaining);

    const posts = await prisma.post.findMany({
      take: limit + 1,
      ...(cursor && cursor !== "" && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
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

    console.log("Posts fetched:", posts.length);

    let nextCursor: string | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem!.id;
      console.log("Next cursor:", nextCursor);
    } else {
      console.log("No more posts available");
    }

    console.log("Returning", posts.length, "posts");
    console.log("=== END API REQUEST ===\n");

    return NextResponse.json({
      posts,
      nextCursor,
    });
  } catch (error) {
    console.error("API Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}