import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId } }
    })

    if (existingLike) {
      // Unlike — remove the like
      await prisma.like.delete({
        where: { postId_userId: { postId, userId } }
      })
      return NextResponse.json({ liked: false }, { status: 200 })
    } else {
      // Like — create the like
      await prisma.like.create({
        data: { postId, userId }
      })
      return NextResponse.json({ liked: true }, { status: 200 })
    }

  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
  }
}